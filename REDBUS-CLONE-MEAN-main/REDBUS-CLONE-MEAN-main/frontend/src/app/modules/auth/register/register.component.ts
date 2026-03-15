import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { NotificationService } from '../../../service/notification.service';
import { environment } from '../../../../../environments/environment';

declare var google: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  registerForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    try {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (response: any) => { this.handleGoogleSignup(response); }
      });
    } catch (err) {
      if (!environment.production) { console.warn('Google SDK not available:', err); }
    }
  }

  ngAfterViewInit(): void {
    try {
      const btn = document.getElementById('google-register-btn');
      if (btn) {
        google.accounts.id.renderButton(btn, {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'signup_with',
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

  handleGoogleSignup(response: any): void {
    const payload = this.decodeJwt(response.credential);
    if (!payload) {
      this.notificationService.error('Google sign-up failed. Please try again.');
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
        this.notificationService.success('Account created with Google!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.notificationService.error(err?.error?.error || 'Google sign-up failed');
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.notificationService.success('Registration successful! Welcome aboard.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.notificationService.error(err?.error?.error || 'Registration failed');
        this.loading = false;
      }
    });
  }
}
