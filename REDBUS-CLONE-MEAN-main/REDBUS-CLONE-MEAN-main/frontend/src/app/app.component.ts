import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  constructor(translate: TranslateService, themeService: ThemeService) {
    translate.addLangs(['en', 'hi']);
    translate.setDefaultLang('en');
    translate.use('en');
    // ThemeService is injected to trigger initialization (reads localStorage & applies theme)
  }
}
