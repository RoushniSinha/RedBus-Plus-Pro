import { Component } from '@angular/core';
import { NotificationService, AppNotification } from '../../../service/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  notifications$: Observable<AppNotification[]>;

  constructor(private notificationService: NotificationService) {
    this.notifications$ = this.notificationService.notifications$;
  }

  dismiss(id: number): void {
    this.notificationService.remove(id);
  }

  trackById(_: number, item: AppNotification): number {
    return item.id;
  }

  getIcon(type: string): string {
    const icons: Record<string, string> = {
      success: 'check_circle',
      error: 'error',
      info: 'info',
      warning: 'warning'
    };
    return icons[type] || 'notifications';
  }

  getBgClass(type: string): string {
    const classes: Record<string, string> = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
      warning: 'bg-yellow-500'
    };
    return classes[type] || 'bg-gray-500';
  }
}
