import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteMapComponent } from './route-map/route-map.component';

const routes: Routes = [
  { path: '', component: RouteMapComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteEliteRoutingModule {}
