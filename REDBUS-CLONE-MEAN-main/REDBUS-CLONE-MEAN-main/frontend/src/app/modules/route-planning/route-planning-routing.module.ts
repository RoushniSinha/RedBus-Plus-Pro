import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePlanningComponent } from './route-planning.component';

const routes: Routes = [{ path: '', component: RoutePlanningComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutePlanningRoutingModule {}
