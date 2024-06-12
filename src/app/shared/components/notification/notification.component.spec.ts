import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { DebugElement, Renderer2 } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';
import { By } from '@angular/platform-browser';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let el: DebugElement;
  let notificationService: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent],
      providers: [NotificationService, Renderer2],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show success notification when success notification is triggered', () => {
    notificationService.success('hello', 1000000);
    fixture.detectChanges();
    const notificationContainer = el.query(By.css('.notification-container'));
    expect(notificationContainer).toBeTruthy();
    const messageBox = notificationContainer.query(By.css('.message-box'));
    expect(messageBox.nativeElement.className).toContain('success');
  });

  it('should show error notification when error notification is triggered', () => {
    notificationService.error('hello', 1000000);
    fixture.detectChanges();
    const notificationContainer = el.query(By.css('.notification-container'));
    expect(notificationContainer).toBeTruthy();
    const messageBox = notificationContainer.query(By.css('.message-box'));
    expect(messageBox.nativeElement.className).toContain('error');
  });

  it('should show info notification when info notification is triggered', () => {
    notificationService.info('hello', 1000000);
    fixture.detectChanges();
    const notificationContainer = el.query(By.css('.notification-container'));
    expect(notificationContainer).toBeTruthy();
    const messageBox = notificationContainer.query(By.css('.message-box'));
    expect(messageBox.nativeElement.className).toContain('info');
  });

  it('should show warning notification when warning notification is triggered', () => {
    notificationService.warning('hello', 1000000);
    fixture.detectChanges();
    const notificationContainer = el.query(By.css('.notification-container'));
    expect(notificationContainer).toBeTruthy();
    const messageBox = notificationContainer.query(By.css('.message-box'));
    expect(messageBox.nativeElement.className).toContain('warning');
  });

  it('should remove warning notification after duration passes out', fakeAsync(() => {
    notificationService.warning('hello', 100);
    fixture.detectChanges();
    const notificationContainer = el.query(By.css('.notification-container'));
    expect(notificationContainer).toBeTruthy();
    let messageBox = notificationContainer.query(By.css('.message-box'));
    expect(messageBox.nativeElement.className).toContain('warning');
    tick(1000);
    fixture.detectChanges();
    messageBox = notificationContainer.query(By.css('.message-box'));
    fixture.whenStable().then(() => {
      expect(messageBox).toBeFalsy();
    })
  }));

  it('should not render any notification if no notification are set', () => {
    notificationService.success('');
    fixture.detectChanges();
    const notificationContainer = el.query(By.css('.notification-container'));
    expect(notificationContainer).toBeTruthy();
    const messageBox = notificationContainer.query(By.css('.message-box'));
    expect(messageBox).toBeFalsy();
  });
});
