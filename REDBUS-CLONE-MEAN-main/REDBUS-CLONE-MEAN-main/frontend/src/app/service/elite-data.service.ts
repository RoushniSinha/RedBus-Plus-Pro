import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ITravelStory } from '../model/travel-story.interface';
import { IReview } from '../model/review.interface';
import { IRouteElite } from '../model/route-elite.interface';
import {
  MOCK_TRAVEL_STORIES,
  MOCK_REVIEWS,
  MOCK_ROUTES
} from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class EliteDataService {
  private readonly apiBase = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ─── Travel Stories ────────────────────────────────────────────────────────

  async getTravelStories(): Promise<ITravelStory[]> {
    try {
      const data = await this.http
        .get<ITravelStory[]>(`${this.apiBase}stories`)
        .toPromise();
      return data ?? MOCK_TRAVEL_STORIES;
    } catch {
      return MOCK_TRAVEL_STORIES;
    }
  }

  async getTravelStoryById(id: string): Promise<ITravelStory | undefined> {
    try {
      return await this.http
        .get<ITravelStory>(`${this.apiBase}stories/${id}`)
        .toPromise();
    } catch {
      return MOCK_TRAVEL_STORIES.find(s => s.id === id);
    }
  }

  async createTravelStory(
    story: Omit<ITravelStory, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'moderationStatus'>
  ): Promise<ITravelStory> {
    return await this.http
      .post<ITravelStory>(`${this.apiBase}stories`, story)
      .toPromise() as ITravelStory;
  }

  // ─── Reviews ───────────────────────────────────────────────────────────────

  async getReviews(busId?: string): Promise<IReview[]> {
    const url = busId
      ? `${this.apiBase}reviews?busId=${busId}`
      : `${this.apiBase}reviews`;
    try {
      const data = await this.http.get<IReview[]>(url).toPromise();
      return data ?? MOCK_REVIEWS;
    } catch {
      return busId
        ? MOCK_REVIEWS.filter(r => r.busId === busId)
        : MOCK_REVIEWS;
    }
  }

  async submitReview(review: Omit<IReview, 'id' | 'createdAt' | 'averageScore' | 'helpfulVotes'>): Promise<IReview> {
    const average = this.computeAverage(review.ratings);
    const payload: Omit<IReview, 'id'> = {
      ...review,
      averageScore: average,
      createdAt: new Date().toISOString(),
      helpfulVotes: 0
    };
    return await this.http
      .post<IReview>(`${this.apiBase}reviews`, payload)
      .toPromise() as IReview;
  }

  // ─── Routes ────────────────────────────────────────────────────────────────

  async getEliteRoutes(): Promise<IRouteElite[]> {
    try {
      const data = await this.http
        .get<IRouteElite[]>(`${this.apiBase}elite-routes`)
        .toPromise();
      return data ?? MOCK_ROUTES;
    } catch {
      return MOCK_ROUTES;
    }
  }

  async getEliteRouteById(id: string): Promise<IRouteElite | undefined> {
    try {
      return await this.http
        .get<IRouteElite>(`${this.apiBase}elite-routes/${id}`)
        .toPromise();
    } catch {
      return MOCK_ROUTES.find(r => r.id === id);
    }
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  computeAverage(ratings: IReview['ratings']): number {
    const values = Object.values(ratings) as number[];
    const sum = values.reduce((a, b) => a + b, 0);
    return Math.round((sum / values.length) * 10) / 10;
  }
}
