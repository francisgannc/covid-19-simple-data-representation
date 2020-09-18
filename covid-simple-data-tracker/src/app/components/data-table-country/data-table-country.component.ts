import { SpecificCountryData } from 'src/app/services/data.service';
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-table-country',
  templateUrl: './data-table-country.component.html',
  styleUrls: ['./data-table-country.component.scss'],
})
export class DataTableCountryComponent implements OnInit, OnChanges {
  @Input()
  data: SpecificCountryData;

  displayedColumns: string[] = [
    'country',
    'confirmed',
    'deaths',
    'recovered',
    'active',
    'date',
  ];
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
