import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../service/notification.service';
import { AuthService } from '../../service/auth.service';
import { environment } from '../../../environments/environment';

export interface TravelStory {
  _id?: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
  rating: number;
  createdAt?: Date;
}

@Component({
  selector: 'app-travel-stories',
  templateUrl: './travel-stories.component.html',
  styleUrls: ['./travel-stories.component.css']
})
export class TravelStoriesComponent implements OnInit {
  storyForm: FormGroup;
  stories: TravelStory[] = [];
  uploading = false;
  submitting = false;
  previewUrl: string | null = null;
  selectedRating = 0;
  showForm = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.storyForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadMockStories();
  }

  private loadMockStories(): void {
    this.stories = [
      {
        title: 'Delhi to Jaipur – A Pink City Adventure',
        content: 'The overnight bus journey to Jaipur was an experience like no other. Winding through the Aravalli foothills as dawn broke was absolutely magical.',
        author: 'Priya Sharma',
        rating: 5,
        imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e43?w=600&q=80',
        createdAt: new Date('2024-11-10')
      },
      {
        title: 'Mumbai to Goa – Coastal Bliss',
        content: 'Took the Volvo AC sleeper bus and it was pure luxury. Arrived refreshed and ready to hit the beaches. The sea views from the Ghat roads are breathtaking!',
        author: 'Rahul Verma',
        rating: 4,
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
        createdAt: new Date('2024-12-01')
      }
    ];
  }

  onFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.notificationService.error('Please select a valid image file.');
      return;
    }
    this.uploading = true;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', environment.cloudinaryUploadPreset);
    this.http.post<{ secure_url: string }>(environment.cloudinaryUploadUrl, formData).subscribe({
      next: (res) => {
        this.storyForm.patchValue({ imageUrl: res.secure_url });
        this.previewUrl = res.secure_url;
        this.notificationService.success('Image uploaded!');
        this.uploading = false;
      },
      error: () => {
        this.notificationService.error('Image upload failed. Please configure Cloudinary.');
        this.uploading = false;
      }
    });
  }

  onRatingChange(rating: number): void {
    this.selectedRating = rating;
  }

  onSubmit(): void {
    if (this.storyForm.invalid) return;
    const user = this.authService.getCurrentUser();
    const newStory: TravelStory = {
      ...this.storyForm.value,
      author: user?.name || 'Anonymous',
      rating: this.selectedRating || 3,
      createdAt: new Date()
    };
    this.stories.unshift(newStory);
    this.notificationService.success('Your story has been shared!');
    this.storyForm.reset();
    this.previewUrl = null;
    this.selectedRating = 0;
    this.showForm = false;
  }
}
