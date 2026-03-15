import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelStoriesComponent } from './travel-stories.component';

const routes: Routes = [{ path: '', component: TravelStoriesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelStoriesRoutingModule {}
