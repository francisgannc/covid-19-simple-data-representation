import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableCountryStatusComponent } from './data-table-country-status.component';

describe('DataTableCountryStatusComponent', () => {
  let component: DataTableCountryStatusComponent;
  let fixture: ComponentFixture<DataTableCountryStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableCountryStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableCountryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
