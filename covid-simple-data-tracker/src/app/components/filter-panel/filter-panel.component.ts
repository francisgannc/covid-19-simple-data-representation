import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MoreInfoDialogComponent } from '../more-info-dialog/more-info-dialog.component';
import {
  CountryInfo,
  MoreInfo,
  SpecificCountryData,
  SpecificCountryStatusData,
  TestingData,
} from 'src/app/models/models';
import { DataService } from 'src/app/services/data.service';

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
  loading = false;
  moreInfoData: MoreInfo;
  testingData: TestingData;

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
    this.loading = true;
    this.dataService.getAllCountryInfo().subscribe((value) => {
      this.countries = value;
      this.loading = false;
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
      this.selectCountry(this.selectedCountry.slug);
    } else {
      this.isLoading.emit(true);
      this.dataService
        .getByCountryStatus(this.selectedCountry.slug, status)
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
    this.moreInfoData = null;
    this.dataService
      .getMoreInfo(this.selectedCountry.slug)
      .subscribe((data) => {
        if (data[0]) {
          this.moreInfoData = data[0];
          this.getTestingData();
        } else {
          this.moreInfoData = null;
          this.testingData = null;
        }
      });
  }

  getTestingData() {
    this.dataService
      .getTestingData(this.selectedCountry.slug)
      .subscribe((data) => {
        if (data && data.length > 0 && data[data.length - 1]) {
          this.testingData = data[data.length - 1];
        } else {
          this.testingData = null;
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
      width: '80%',
      height: '60%',
      disableClose: true,
      data: { moreInfo: this.moreInfoData, testingData: this.testingData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
