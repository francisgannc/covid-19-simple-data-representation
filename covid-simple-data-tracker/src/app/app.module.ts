import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTableViewContainerComponent } from './components/data-table-view-container/data-table-view-container.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableComponent } from './components/data-table/data-table.component';
import { WorldStatsComponent } from './components/world-stats/world-stats.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { BannerComponent } from './components/banner/banner.component';
import { DataTableCountryComponent } from './components/data-table-country/data-table-country.component';
import { DataTableCountryStatusComponent } from './components/data-table-country-status/data-table-country-status.component';
import { DataTableSummaryComponent } from './components/data-table-summary/data-table-summary.component';
import { MoreInfoDialogComponent } from './components/more-info-dialog/more-info-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DataTableViewContainerComponent,
    DataTableComponent,
    WorldStatsComponent,
    FilterPanelComponent,
    BannerComponent,
    DataTableCountryComponent,
    DataTableCountryStatusComponent,
    DataTableSummaryComponent,
    MoreInfoDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
