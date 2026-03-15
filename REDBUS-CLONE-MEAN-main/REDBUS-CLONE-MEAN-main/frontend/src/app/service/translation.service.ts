import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export type SupportedLang = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'gu' | 'kn';

export interface ITranslations {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  readonly currentLang = signal<SupportedLang>('en');
  private translations: Map<SupportedLang, ITranslations> = new Map();

  private readonly fallback: ITranslations = {
    'nav.home': 'Home',
    'nav.community': 'Community',
    'nav.routes': 'Routes',
    'nav.reviews': 'Reviews',
    'community.title': 'Travel Stories',
    'community.share': 'Share Your Story',
    'review.title': 'Write a Review',
    'review.submit': 'Submit Review',
    'review.punctuality': 'Punctuality',
    'review.cleanliness': 'Cleanliness',
    'review.amenities': 'Amenities',
    'review.driverBehavior': 'Driver Behavior',
    'review.comfort': 'Comfort',
    'route.title': 'Route Explorer',
    'route.selectWaypoint': 'Select Waypoint',
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.save': 'Save',
    'common.cancel': 'Cancel'
  };

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem('redbus-lang') as SupportedLang | null;
    if (saved) {
      this.use(saved);
    }
  }

  use(lang: SupportedLang): void {
    this.currentLang.set(lang);
    localStorage.setItem('redbus-lang', lang);

    if (!this.translations.has(lang)) {
      this.loadTranslations(lang).subscribe();
    }
  }

  translate(key: string): string {
    const langMap = this.translations.get(this.currentLang());
    return langMap?.[key] ?? this.fallback[key] ?? key;
  }

  syncWithUserProfile(userId: string, lang: SupportedLang): Observable<unknown> {
    return this.http.patch(`/customer/${userId}`, { languagePref: lang }).pipe(
      tap(() => this.use(lang)),
      catchError(() => {
        this.use(lang);
        return of(null);
      })
    );
  }

  private loadTranslations(lang: SupportedLang): Observable<ITranslations> {
    return this.http.get<ITranslations>(`/assets/i18n/${lang}.json`).pipe(
      tap(data => this.translations.set(lang, data)),
      catchError(() => {
        this.translations.set(lang, this.fallback);
        return of(this.fallback);
      })
    );
  }
}
