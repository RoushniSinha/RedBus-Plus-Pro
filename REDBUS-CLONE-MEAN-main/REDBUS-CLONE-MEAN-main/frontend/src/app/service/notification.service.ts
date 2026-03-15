import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface INotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  duration?: number;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<INotification[]>([]);
  readonly notifications$: Observable<INotification[]> = this.notificationsSubject.asObservable();

  private push(notification: Omit<INotification, 'id' | 'timestamp'>): void {
    const newNotif: INotification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };
    const current = this.notificationsSubject.getValue();
    this.notificationsSubject.next([...current, newNotif]);

    const duration = notification.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => this.dismiss(newNotif.id), duration);
    }
  }

  success(message: string, title?: string, duration?: number): void {
    this.push({ type: 'success', message, title, duration });
  }

  error(message: string, title?: string, duration?: number): void {
    this.push({ type: 'error', message, title, duration });
  }

  warning(message: string, title?: string, duration?: number): void {
    this.push({ type: 'warning', message, title, duration });
  }

  info(message: string, title?: string, duration?: number): void {
    this.push({ type: 'info', message, title, duration });
  }

  dismiss(id: string): void {
    const current = this.notificationsSubject.getValue();
    this.notificationsSubject.next(current.filter(n => n.id !== id));
  }

  clearAll(): void {
    this.notificationsSubject.next([]);
  }
}
