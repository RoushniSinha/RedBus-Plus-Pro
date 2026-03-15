import { Component, OnInit, signal } from '@angular/core';
import { EliteDataService } from '../../service/elite-data.service';
import { NotificationService } from '../../service/notification.service';
import { ITravelStory } from '../../model/travel-story.interface';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  readonly stories = signal<ITravelStory[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  constructor(
    private dataService: EliteDataService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.dataService.getTravelStories();
      this.stories.set(data);
    } catch {
      this.error.set('Failed to load travel stories.');
      this.notificationService.error('Could not load travel stories. Please try again later.');
    } finally {
      this.loading.set(false);
    }
  }

  trackByStoryId(_index: number, story: ITravelStory): string {
    return story.id ?? _index.toString();
  }

  getExcerpt(story: ITravelStory): string {
    const intro = story.content['intro'];
    if (typeof intro === 'string') {
      return intro.length > 160 ? intro.slice(0, 157) + '…' : intro;
    }
    return '';
  }

  getFirstImage(story: ITravelStory): string {
    return story.mediaUrls[0] ?? 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop';
  }
}
