import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { TravelStoriesRoutingModule } from './travel-stories-routing.module';
import { TravelStoriesComponent } from './travel-stories.component';
import { StarRatingModule } from '../../shared/star-rating.module';

@NgModule({
  declarations: [TravelStoriesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    TravelStoriesRoutingModule,
    StarRatingModule
  ]
})
export class TravelStoriesModule {}
