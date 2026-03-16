import { Component, OnInit } from '@angular/core';
declare var google:any;
import { CustomerService } from '../../service/customer.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService, AuthUser } from '../../service/auth.service';
import { ThemeService } from '../../service/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isloggedIn: boolean = false;
  isMobileMenuOpen = false;
  currentUser$: Observable<AuthUser | null>;
  isDark$: Observable<boolean>;
  currentLang = 'en';
  availableLangs = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हिं' }
  ];

  constructor(
    private router: Router,
    private customerservice: CustomerService,
    private authService: AuthService,
    public themeService: ThemeService,
    private translate: TranslateService
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.isDark$ = this.themeService.isDark$!;
  }

  ngOnInit(): void {
    this.isloggedIn = this.authService.isLoggedIn() || !!sessionStorage.getItem('Loggedinuser');

    try {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (response: any) => { this.handlelogin(response); }
      });
    } catch (err) {
      // Google One Tap SDK not loaded (e.g. in test/SSR environment)
      if (!environment.production) { console.warn('Google SDK not available:', err); }
    }
  }

  ngAfterViewInit(): void {
    this.rendergooglebutton();
  }

  private rendergooglebutton(): void {
    try {
      const googlebtn = document.getElementById('google-btn');
      if (googlebtn) {
        google.accounts.id.renderButton(googlebtn, {
          theme: 'outline', size: 'medium', shape: 'pill', width: 150,
        });
      }
    } catch (err) {
      // Google SDK not available (e.g. in test/SSR environment)
      if (!environment.production) { console.warn('Google renderButton not available:', err); }
    }
  }

  private decodetoken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handlelogin(response: any) {
    const payload = this.decodetoken(response.credential);
    this.customerservice.addcustomermongo(payload).subscribe({
      next: (res) => {
        sessionStorage.setItem('Loggedinuser', JSON.stringify(res));
        this.isloggedIn = true;
      },
      error: (error) => { console.error('Post request failed', error); }
    });
  }

  handlelogout() {
    try {
      google.accounts.id.disableAutoSelect();
    } catch (err) {
      // Google SDK may not be available; safe to ignore
      if (!environment.production) { console.warn('Google disableAutoSelect not available:', err); }
    }
    sessionStorage.removeItem('Loggedinuser');
    this.authService.logout();
    this.isloggedIn = false;
    this.isMobileMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  navigateAndCloseMobileMenu(route: string): void {
    this.navigate(route);
    this.isMobileMenuOpen = false;
  }

  toggleDarkMode(): void {
    this.themeService.toggleTheme();
  }

  switchLanguage(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
