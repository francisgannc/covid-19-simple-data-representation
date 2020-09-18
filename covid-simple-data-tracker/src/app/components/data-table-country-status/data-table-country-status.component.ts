import { SpecificCountryStatusData } from './../../services/data.service';
import { SpecificCountryData } from 'src/app/services/data.service';
import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  Input,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-table-country-status',
  templateUrl: './data-table-country-status.component.html',
  styleUrls: ['./data-table-country-status.component.scss'],
})
export class DataTableCountryStatusComponent implements OnInit, OnChanges {
  @Input()
  data: SpecificCountryStatusData;

  displayedColumns: string[] = ['country', 'status', 'cases', 'date'];
  dataSource = new MatTableDataSource([]);

  @Input()
  loading: boolean;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = [];
    if (
      changes.data &&
      changes.data.currentValue &&
      changes.data.currentValue.length > 0
    ) {
      this.dataSource = new MatTableDataSource(changes.data.currentValue);
    }
  }
}
