import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableCountryComponent } from './data-table-country.component';

describe('DataTableCountryComponent', () => {
  let component: DataTableCountryComponent;
  let fixture: ComponentFixture<DataTableCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
