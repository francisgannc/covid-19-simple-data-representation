import {
  SpecificCountryData,
  SpecificCountryStatusData,
} from './../../services/data.service';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
}
