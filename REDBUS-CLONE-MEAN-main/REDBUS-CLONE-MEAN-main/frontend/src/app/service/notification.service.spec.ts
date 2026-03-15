import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a success notification', (done) => {
    service.success('Test success');
    service.notifications$.subscribe(notifications => {
      expect(notifications.length).toBe(1);
      expect(notifications[0].type).toBe('success');
      expect(notifications[0].message).toBe('Test success');
      done();
    });
  });

  it('should add an error notification', (done) => {
    service.error('Something went wrong');
    service.notifications$.subscribe(notifications => {
      expect(notifications.length).toBe(1);
      expect(notifications[0].type).toBe('error');
      done();
    });
  });

  it('should remove notification by id', (done) => {
    service.info('Info message');
    service.notifications$.subscribe(notifications => {
      if (notifications.length === 1) {
        const id = notifications[0].id;
        service.remove(id);
        service.notifications$.subscribe(updated => {
          expect(updated.length).toBe(0);
          done();
        });
      }
    });
  });
});
