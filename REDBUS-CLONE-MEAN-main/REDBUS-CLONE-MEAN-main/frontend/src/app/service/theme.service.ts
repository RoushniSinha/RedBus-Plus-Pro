import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly DARK_CLASS = 'dark';
  private readonly STORAGE_KEY = 'theme';
  private renderer: Renderer2;
  private isDarkSubject: BehaviorSubject<boolean>;
  isDark$: Observable<boolean>;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;
    this.isDarkSubject = new BehaviorSubject<boolean>(isDark);
    this.isDark$ = this.isDarkSubject.asObservable();
    this.applyTheme(isDark);
  }

  get isDark(): boolean {
    return this.isDarkSubject.value;
  }

  toggleTheme(): void {
    const next = !this.isDarkSubject.value;
    this.isDarkSubject.next(next);
    localStorage.setItem(this.STORAGE_KEY, next ? 'dark' : 'light');
    this.applyTheme(next);
  }

  private applyTheme(isDark: boolean): void {
    const html = document.documentElement;
    if (isDark) {
      this.renderer.addClass(html, this.DARK_CLASS);
    } else {
      this.renderer.removeClass(html, this.DARK_CLASS);
    }
  }
}
