import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null when not logged in', () => {
    expect(service.isLoggedIn()).toBeFalse();
    expect(service.getCurrentUser()).toBeNull();
  });

  it('should store token and user on login', () => {
    const mockResponse = {
      token: 'test.jwt.token',
      customer: { _id: '1', name: 'Test User', email: 'test@example.com' }
    };

    service.login({ email: 'test@example.com', password: 'password123' }).subscribe(res => {
      expect(res.token).toBe('test.jwt.token');
      expect(service.isLoggedIn()).toBeTrue();
      expect(service.getCurrentUser()?.email).toBe('test@example.com');
    });

    const req = httpMock.expectOne(r => r.url.includes('auth/login'));
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should clear auth state on logout', () => {
    localStorage.setItem('jwt_token', 'sometoken');
    localStorage.setItem('auth_user', JSON.stringify({ _id: '1', name: 'Test', email: 'test@test.com' }));
    service.logout();
    expect(service.isLoggedIn()).toBeFalse();
    expect(service.getCurrentUser()).toBeNull();
  });
});
