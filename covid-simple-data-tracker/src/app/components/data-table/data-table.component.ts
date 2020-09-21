import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  SpecificCountryData,
  SpecificCountryStatusData,
} from 'src/app/models/models';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input()
  specificCountryData: SpecificCountryData;

  @Input()
  specificCountryStatusData: SpecificCountryStatusData;

  @Input()
  isFiltersCleared: boolean;

  @Input()
  bySummaryActive: boolean = true;

  @Input()
  byCountryActive: boolean;

  @Input()
  byCountryStatusActive: boolean;

  @Input()
  loading: boolean;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  isLoading(emit: boolean) {
    this.loading = emit;
  }
}
