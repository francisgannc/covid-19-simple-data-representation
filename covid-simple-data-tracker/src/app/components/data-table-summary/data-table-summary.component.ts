import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
  AfterContentInit,
  AfterViewChecked,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Country, DataService } from 'src/app/services/data.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-table-summary',
  templateUrl: './data-table-summary.component.html',
  styleUrls: ['./data-table-summary.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataTableSummaryComponent implements OnInit, AfterViewInit {
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  @Input()
  specificCountryData: Country;

  @Input()
  isFiltersCleared: boolean;

  displayedColumns: string[] = [
    'country',
    'newConfirmed',
    'totalConfirmed',
    'newDeaths',
    'totalDeaths',
    'newRecovered',
    'totalRecovered',
    'date',
  ];
  dataSource = new MatTableDataSource();
  loading = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();

    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.loading = true;
    this.dataService.getSummary().subscribe((value) => {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
