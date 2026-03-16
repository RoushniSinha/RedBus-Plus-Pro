import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ThemeMode = 'light' | 'dark' | 'oled';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly DARK_CLASS = 'dark';
  private readonly OLED_CLASS = 'oled-dark';
  private readonly STORAGE_KEY = 'theme';
  private renderer: Renderer2;
  private modeSubject: BehaviorSubject<ThemeMode>;
  mode$: Observable<ThemeMode>;

  /** Convenience observable – true for both 'dark' and 'oled' modes */
  isDark$: Observable<boolean>;
  private isDarkSubject: BehaviorSubject<boolean>;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    const saved = localStorage.getItem(this.STORAGE_KEY) as ThemeMode | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: ThemeMode = saved ?? (prefersDark ? 'dark' : 'light');
    this.modeSubject = new BehaviorSubject<ThemeMode>(initial);
    this.mode$ = this.modeSubject.asObservable();
    this.isDarkSubject = new BehaviorSubject<boolean>(initial !== 'light');
    this.isDark$ = this.isDarkSubject.asObservable();
    this.applyMode(initial);
  }

  get isDark(): boolean {
    return this.modeSubject.value !== 'light';
  }

  get currentMode(): ThemeMode {
    return this.modeSubject.value;
  }

  /** Cycles light → dark → oled → light */
  toggleTheme(): void {
    const next = this.nextMode(this.modeSubject.value);
    this.setMode(next);
  }

  /** Explicitly set the theme mode */
  setMode(mode: ThemeMode): void {
    this.modeSubject.next(mode);
    this.isDarkSubject.next(mode !== 'light');
    localStorage.setItem(this.STORAGE_KEY, mode);
    this.applyMode(mode);
  }

  private nextMode(current: ThemeMode): ThemeMode {
    const cycle: ThemeMode[] = ['light', 'dark', 'oled'];
    const idx = cycle.indexOf(current);
    return idx === -1 ? 'light' : cycle[(idx + 1) % cycle.length];
  }

  private applyMode(mode: ThemeMode): void {
    const html = document.documentElement;
    // Reset both classes first
    this.renderer.removeClass(html, this.DARK_CLASS);
    this.renderer.removeClass(html, this.OLED_CLASS);

    if (mode === 'dark') {
      this.renderer.addClass(html, this.DARK_CLASS);
    } else if (mode === 'oled') {
      this.renderer.addClass(html, this.DARK_CLASS);
      this.renderer.addClass(html, this.OLED_CLASS);
    }
  }
}

