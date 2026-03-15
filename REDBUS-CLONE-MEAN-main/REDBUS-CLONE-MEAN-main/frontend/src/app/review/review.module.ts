import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewRoutingModule } from './review-routing.module';
import { ReviewFormComponent } from './review-form/review-form.component';

@NgModule({
  declarations: [ReviewFormComponent],
  imports: [CommonModule, FormsModule, ReviewRoutingModule]
})
export class ReviewModule {}
