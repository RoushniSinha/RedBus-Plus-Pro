import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RoutePlanningRoutingModule } from './route-planning-routing.module';
import { RoutePlanningComponent } from './route-planning.component';

@NgModule({
  declarations: [RoutePlanningComponent],
  imports: [CommonModule, MatIconModule, RoutePlanningRoutingModule]
})
export class RoutePlanningModule {}
