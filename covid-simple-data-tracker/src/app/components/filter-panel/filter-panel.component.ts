import {
  DataService,
  CountryInfo,
  SpecificCountryData,
  SpecificCountryStatusData,
  MoreInfo,
} from './../../services/data.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MoreInfoDialogComponent } from '../more-info-dialog/more-info-dialog.component';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent implements OnInit {
  countries: CountryInfo[] = [];
  selectedCountry: CountryInfo;
  selectedStatus = '';
  disableStatus = true;
  disableMoreInfo = false;
  moreInfoData: MoreInfo;

  minDate: Date;

  @Output() selectCountryEmit = new EventEmitter<SpecificCountryData[]>();
  @Output() selectCountryStatusEmit = new EventEmitter<
    SpecificCountryStatusData[]
  >();
  @Output() clearFiltersEmit = new EventEmitter<boolean>();
  @Output() isLoading = new EventEmitter<boolean>();

  constructor(
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.minDate = new Date(2019, 0, 1);
    this.dataService.getAllCountryInfo().subscribe((value) => {
      this.countries = value;
    });
  }

  selectCountry(country: string) {
    if (this.selectedStatus) {
      this.selectStatus(this.selectedStatus);
    } else {
      this.isLoading.emit(true);
      this.dataService.getAllByCountry(country).subscribe((value) => {
        this.selectCountryEmit.emit(value);
        this.isLoading.emit(false);
        this.openSnackBar(
          value.length > 0
            ? 'Returns all cases for a country for the past 7 days.'
            : 'No records found.',
          'Done'
        );
      });
      this.disableStatus = false;
    }
    this.getMoreInfo();
  }

  selectStatus(status: string) {
    if (!this.selectedStatus) {
      this.selectCountry(this.selectedCountry.Slug);
    } else {
      this.isLoading.emit(true);
      this.dataService
        .getByCountryStatus(this.selectedCountry.Slug, status)
        .subscribe((value) => {
          this.selectCountryStatusEmit.emit(value);
          this.isLoading.emit(false);
          this.openSnackBar(
            value.length > 0
              ? 'Returns all cases by case type for a country for the past 7 days.'
              : 'No records found.',
            'Done'
          );
        });
    }
  }

  getMoreInfo() {
    this.dataService
      .getMoreInfo(this.selectedCountry.Slug)
      .subscribe((data) => {
        if (data[0]) {
          this.moreInfoData = data[0];
          this.disableMoreInfo = false;
        } else {
          this.moreInfoData = null;
          this.disableMoreInfo = true;
        }
      });
  }

  clearFilters() {
    this.selectedCountry = null;
    this.selectedStatus = '';
    this.disableStatus = true;
    this.clearFiltersEmit.emit(true);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
    });
  }

  openMoreInfo(): void {
    const dialogRef = this.dialog.open(MoreInfoDialogComponent, {
      width: '40%',
      height: '70%',
      data: this.moreInfoData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
