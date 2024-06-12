import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationType } from '../../enums/notification-type.enum';
import { INotification } from '../../interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notification$: Subject<INotification> =
    new Subject();

  success(message: string, duration?: number) {
    this.notify(message, NotificationType.Success, duration);
  }

  warning(message: string, duration?: number) {
    this.notify(message, NotificationType.Warning, duration);
  }
  error(message: string, duration?: number) {
    this.notify(message, NotificationType.Error, duration);
  }

  info(message: string, duration?: number) {
    this.notify(message, NotificationType.Info, duration);
  }

  private notify(message: string, type: NotificationType, duration?: number) {
    duration = !duration ? 3000 : duration;
    this.notification$.next({
      message: message,
      type: type,
      duration: duration,
    });
  }
}
