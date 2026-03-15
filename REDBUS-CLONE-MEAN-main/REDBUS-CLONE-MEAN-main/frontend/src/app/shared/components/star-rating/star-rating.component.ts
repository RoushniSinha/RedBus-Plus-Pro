import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  @Input() rating = 0;
  @Input() maxStars = 5;
  @Input() readonly = false;
  @Output() ratingChange = new EventEmitter<number>();

  stars: number[] = [];
  hoveredStar = 0;

  ngOnInit(): void {
    this.stars = Array.from({ length: this.maxStars }, (_, i) => i + 1);
  }

  onHover(star: number): void {
    if (!this.readonly) {
      this.hoveredStar = star;
    }
  }

  onLeave(): void {
    this.hoveredStar = 0;
  }

  onSelect(star: number): void {
    if (!this.readonly) {
      this.rating = star;
      this.ratingChange.emit(star);
    }
  }

  isActive(star: number): boolean {
    return star <= (this.hoveredStar || this.rating);
  }
}
