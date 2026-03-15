import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewFormComponent } from './review-form/review-form.component';

const routes: Routes = [
  { path: '', component: ReviewFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule {}
