import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarRatingComponent } from './star-rating.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarRatingComponent],
      imports: [CommonModule, MatIconModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate correct number of stars', () => {
    component.maxStars = 5;
    component.ngOnInit();
    expect(component.stars.length).toBe(5);
  });

  it('should emit rating on select', () => {
    let emittedRating = 0;
    component.ratingChange.subscribe((r: number) => emittedRating = r);
    component.onSelect(4);
    expect(emittedRating).toBe(4);
    expect(component.rating).toBe(4);
  });

  it('should not select when readonly', () => {
    component.readonly = true;
    component.rating = 3;
    component.onSelect(5);
    expect(component.rating).toBe(3);
  });

  it('isActive should return true for stars <= rating', () => {
    component.rating = 3;
    expect(component.isActive(1)).toBeTrue();
    expect(component.isActive(3)).toBeTrue();
    expect(component.isActive(4)).toBeFalse();
  });
});
