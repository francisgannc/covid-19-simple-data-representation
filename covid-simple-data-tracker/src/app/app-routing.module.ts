import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataTableViewContainerComponent } from './components/data-table-view-container/data-table-view-container.component';

const routes: Routes = [
  { path: '', redirectTo: '/view', pathMatch: 'full' },
  { path: 'view', component: DataTableViewContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
