import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StarRatingComponent } from './components/star-rating/star-rating.component';

@NgModule({
  declarations: [StarRatingComponent],
  imports: [CommonModule, MatIconModule],
  exports: [StarRatingComponent]
})
export class StarRatingModule {}
