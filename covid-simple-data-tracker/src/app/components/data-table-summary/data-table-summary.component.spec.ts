import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableSummaryComponent } from './data-table-summary.component';

describe('DataTableSummaryComponent', () => {
  let component: DataTableSummaryComponent;
  let fixture: ComponentFixture<DataTableSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
