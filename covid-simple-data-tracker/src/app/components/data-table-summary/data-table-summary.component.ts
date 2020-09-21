import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { SpecificCountryData } from 'src/app/models/models';

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
  specificCountryData: SpecificCountryData;

  @Input()
  isFiltersCleared: boolean;

  @Input()
  loading: boolean;

  @Output()
  isLoading = new EventEmitter<boolean>();

  displayedColumns: string[] = [
    'number',
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
  activeSort = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();

    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.isLoading.emit(true);
    this.dataService.getSummary().subscribe((value) => {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoading.emit(false);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  clickSort(sort: string) {
    this.activeSort = sort;
  }

  ngClassArg(sort: string) {
    return {
      active: sort === this.activeSort,
      header: sort != this.activeSort,
    };
  }
}
