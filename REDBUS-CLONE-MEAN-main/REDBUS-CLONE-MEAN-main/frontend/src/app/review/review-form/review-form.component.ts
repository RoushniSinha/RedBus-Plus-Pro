import { Component, OnInit, signal, computed } from '@angular/core';
import { EliteDataService } from '../../service/elite-data.service';
import { NotificationService } from '../../service/notification.service';
import { IDimensionalRating, IReview } from '../../model/review.interface';

interface RatingDimension {
  key: keyof IDimensionalRating;
  label: string;
  description: string;
}

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  readonly dimensions: RatingDimension[] = [
    { key: 'punctuality',    label: 'Punctuality',     description: 'On-time departure and arrival' },
    { key: 'cleanliness',    label: 'Cleanliness',     description: 'Hygiene inside the bus' },
    { key: 'amenities',      label: 'Amenities',       description: 'Charging ports, Wi-Fi, blankets' },
    { key: 'driverBehavior', label: 'Driver Behavior', description: 'Professionalism and road safety' },
    { key: 'comfort',        label: 'Comfort',         description: 'Seat quality, legroom, AC' }
  ];

  readonly ratings = signal<IDimensionalRating>({
    punctuality: 0,
    cleanliness: 0,
    amenities: 0,
    driverBehavior: 0,
    comfort: 0
  });

  readonly comment = signal<string>('');
  readonly submitting = signal<boolean>(false);
  readonly submitted = signal<boolean>(false);
  readonly recentReviews = signal<IReview[]>([]);

  readonly averageScore = computed<number>(() => {
    return this.dataService.computeAverage(this.ratings());
  });

  readonly allRated = computed<boolean>(() => {
    const r = this.ratings();
    return Object.values(r).every((v: number) => v > 0);
  });

  constructor(
    private dataService: EliteDataService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    const reviews = await this.dataService.getReviews();
    this.recentReviews.set(reviews.slice(0, 5));
  }

  setRating(dimension: keyof IDimensionalRating, value: number): void {
    this.ratings.update(prev => ({ ...prev, [dimension]: value }));
  }

  getStars(score: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  async submit(): Promise<void> {
    if (!this.allRated()) {
      this.notificationService.warning('Please rate all dimensions before submitting.');
      return;
    }
    this.submitting.set(true);
    try {
      await this.dataService.submitReview({
        busId: 'bus-demo',
        customerId: 'user-demo',
        customerName: 'Guest User',
        ratings: this.ratings(),
        comment: this.comment(),
        timeDecayWeight: 1.0,
        journeyDate: new Date().toISOString().split('T')[0]
      });
      this.submitted.set(true);
      this.notificationService.success('Review submitted successfully!');
    } catch {
      this.notificationService.error('Failed to submit review. Please try again.');
    } finally {
      this.submitting.set(false);
    }
  }

  reset(): void {
    this.ratings.set({ punctuality: 0, cleanliness: 0, amenities: 0, driverBehavior: 0, comfort: 0 });
    this.comment.set('');
    this.submitted.set(false);
  }

  trackByReviewId(_index: number, review: IReview): string {
    return review.id ?? _index.toString();
  }
}
