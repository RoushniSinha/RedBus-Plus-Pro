import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { NotificationService } from '../../../service/notification.service';
import { environment } from '../../../../../environments/environment';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    try {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (response: any) => { this.handleGoogleLogin(response); }
      });
    } catch (err) {
      if (!environment.production) { console.warn('Google SDK not available:', err); }
    }
  }

  ngAfterViewInit(): void {
    try {
      const btn = document.getElementById('google-login-btn');
      if (btn) {
        google.accounts.id.renderButton(btn, {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'signin_with',
          shape: 'rectangular'
        });
      }
    } catch (err) {
      if (!environment.production) { console.warn('Google renderButton not available:', err); }
    }
  }

  private decodeJwt(token: string): any {
    return this.authService.decodeGoogleJwt(token);
  }

  handleGoogleLogin(response: any): void {
    const payload = this.decodeJwt(response.credential);
    if (!payload) {
      this.notificationService.error('Google login failed. Please try again.');
      return;
    }
    this.loading = true;
    this.authService.googleLogin({
      name: payload.name,
      email: payload.email,
      googleId: payload.sub,
      profilePicture: payload.picture
    }).subscribe({
      next: () => {
        this.notificationService.success('Signed in with Google!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.notificationService.error(err?.error?.error || 'Google login failed');
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.notificationService.success('Logged in successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.notificationService.error(err?.error?.error || 'Login failed');
        this.loading = false;
      }
    });
  }
}
