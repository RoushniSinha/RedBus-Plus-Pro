import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface AppNotification {
  id: number;
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private counter = 0;
  private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  private add(message: string, type: NotificationType): void {
    const notification: AppNotification = { id: ++this.counter, message, type };
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next([...current, notification]);
    setTimeout(() => this.remove(notification.id), 4000);
  }

  success(message: string): void { this.add(message, 'success'); }
  error(message: string): void { this.add(message, 'error'); }
  info(message: string): void { this.add(message, 'info'); }
  warning(message: string): void { this.add(message, 'warning'); }

  remove(id: number): void {
    const filtered = this.notificationsSubject.value.filter(n => n.id !== id);
    this.notificationsSubject.next(filtered);
  }
}
