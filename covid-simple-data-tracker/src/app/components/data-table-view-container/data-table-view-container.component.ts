import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  SpecificCountryData,
  SpecificCountryStatusData,
} from 'src/app/models/models';

@Component({
  selector: 'app-data-table-view-container',
  templateUrl: './data-table-view-container.component.html',
  styleUrls: ['./data-table-view-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableViewContainerComponent implements OnInit {
  bySummaryActive = true;
  specificCountryData: SpecificCountryData[];
  byCountryActive = false;
  specificCountryStatusData: SpecificCountryStatusData[];
  byCountryStatusActive = false;
  isFiltersCleared: boolean;
  loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  selectCountryEmit(dataEmitted: SpecificCountryData[]) {
    this.specificCountryData = dataEmitted;
    this.bySummaryActive = false;
    this.byCountryActive = true;
    this.byCountryStatusActive = false;
  }

  selectCountryStatusEmit(dataEmitted: SpecificCountryStatusData[]) {
    this.specificCountryStatusData = dataEmitted;
    this.bySummaryActive = false;
    this.byCountryActive = false;
    this.byCountryStatusActive = true;
  }

  activateSummary() {
    this.bySummaryActive = true;
    this.byCountryActive = false;
    this.byCountryStatusActive = false;
  }

  clearFiltersEmit(emit: boolean) {
    this.isFiltersCleared = emit;
    this.activateSummary();
  }

  isLoading(emit: boolean) {
    this.loading = emit;
  }
}
