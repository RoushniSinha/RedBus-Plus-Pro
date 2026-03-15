import { Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  readonly isDark = signal<boolean>(false);

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    const saved = localStorage.getItem('redbus-theme');
    if (saved === 'dark') {
      this.enableDark();
    }
  }

  enableDark(): void {
    this.renderer.addClass(document.documentElement, 'dark');
    this.isDark.set(true);
    localStorage.setItem('redbus-theme', 'dark');
  }

  disableDark(): void {
    this.renderer.removeClass(document.documentElement, 'dark');
    this.isDark.set(false);
    localStorage.setItem('redbus-theme', 'light');
  }

  toggle(): void {
    if (this.isDark()) {
      this.disableDark();
    } else {
      this.enableDark();
    }
  }
}
