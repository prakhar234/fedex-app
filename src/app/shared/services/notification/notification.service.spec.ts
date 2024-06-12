import { fakeAsync, flushMicrotasks } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { NotificationType } from '../../enums/notification-type.enum';
import { INotification } from '../../interfaces/notification.interface';

describe('NotificationServiceService', () => {
  let service: NotificationService;

  beforeEach(() => {
    service = new NotificationService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit success notification', fakeAsync(() => {
    service.notification$.subscribe((notification: INotification) => {
      testNotification = notification;
    });

    let testNotification: INotification = {
      message: 'ABC',
      type: NotificationType.Error,
      duration: 3000
    };
    service.success('hello', 1000);
    flushMicrotasks();
    expect(testNotification.message).toEqual('hello');
    expect(testNotification.type).toBe(NotificationType.Success);
  }));

  it('should emit error notification', fakeAsync(() => {
    service.notification$.subscribe((notification: INotification) => {
      testNotification = notification;
    });

    let testNotification: INotification = {
      message: 'ABC',
      type: NotificationType.Success,
      duration: 3000
    };
    service.error('hello', 1000);
    flushMicrotasks();
    expect(testNotification.message).toEqual('hello');
    expect(testNotification.type).toBe(NotificationType.Error);
  }));

  it('should emit info notification', fakeAsync(() => {
    service.notification$.subscribe((notification: INotification) => {
      testNotification = notification;
    });

    let testNotification: INotification = {
      message: 'ABC',
      type: NotificationType.Success,
      duration: 3000
    };
    service.info('hello', 1000);
    flushMicrotasks();
    expect(testNotification.message).toEqual('hello');
    expect(testNotification.type).toBe(NotificationType.Info);
  }));

  it('should emit warning notification', fakeAsync(() => {
    service.notification$.subscribe((notification: INotification) => {
      testNotification = notification;
    });

    let testNotification: INotification = {
      message: 'ABC',
      type: NotificationType.Success,
      duration: 3000
    };
    service.warning('hello', 1000);
    flushMicrotasks();
    expect(testNotification.message).toEqual('hello');
    expect(testNotification.type).toBe(NotificationType.Warning);
  }));
});
