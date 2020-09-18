import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableViewContainerComponent } from './data-table-view-container.component';

describe('DataTableViewContainerComponent', () => {
  let component: DataTableViewContainerComponent;
  let fixture: ComponentFixture<DataTableViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
