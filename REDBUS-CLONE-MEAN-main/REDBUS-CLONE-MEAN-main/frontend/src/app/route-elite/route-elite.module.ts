import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteEliteRoutingModule } from './route-elite-routing.module';
import { RouteMapComponent } from './route-map/route-map.component';

@NgModule({
  declarations: [RouteMapComponent],
  imports: [CommonModule, RouteEliteRoutingModule]
})
export class RouteEliteModule {}
