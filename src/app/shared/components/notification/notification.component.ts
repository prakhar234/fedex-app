import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';
import { takeWhile } from 'rxjs';
import { NotificationType } from '../../enums/notification-type.enum';
import { INotification } from '../../interfaces/notification.interface';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit, OnDestroy {
  @ViewChild('notificationContainer') container: ElementRef<HTMLDivElement> | undefined;
  constructor(
    private service: NotificationService,
    private renderer: Renderer2
  ) {}
  private _subscribed: boolean = true;
  private classMap: Map<NotificationType, string> | undefined;

  ngOnInit(): void {
    this.classMap = new Map<NotificationType, string>();
    this.classMap.set(NotificationType.Success, 'success');
    this.classMap.set(NotificationType.Warning, 'warning');
    this.classMap.set(NotificationType.Error, 'error');
    this.classMap.set(NotificationType.Info, 'info');

    this.service.notification$
      .pipe(takeWhile(() => this._subscribed))
      .subscribe({
        next: this.render.bind(this),
      })
  }

  ngOnDestroy() {
    this._subscribed = false;
  }
  private render(notification: INotification) {
    if(notification.message === '') {
      return;
    }
    const notificationBox = this.renderer.createElement('div');
    const header = this.renderer.createElement('b');
    const content = this.renderer.createElement('div');
    const boxColorClass = this.classMap?.get(notification.type);
    const classesToAdd = ['message-box', boxColorClass];
    classesToAdd.forEach((x) => this.renderer.addClass(notificationBox, x as string));
    this.renderer.setStyle(
      notificationBox,
      'transition',
      `opacity ${notification.duration}ms`
    );
    this.renderer.setStyle(notificationBox, 'opacity', '1');
    const headerText = this.renderer.createText(
      NotificationType[notification.type]
    );
    this.renderer.appendChild(header, headerText);
    const text = this.renderer.createText(notification.message);
    this.renderer.appendChild(content, text);
    this.renderer.appendChild(this.container?.nativeElement, notificationBox);
    this.renderer.appendChild(notificationBox, header);
    this.renderer.appendChild(notificationBox, content);
    setTimeout(() => {
      this.renderer.setStyle(notificationBox, 'opacity', '0');
      setTimeout(() => {
        this.renderer.removeChild(
          this.container?.nativeElement,
          notificationBox
        );
      }, notification.duration);
    }, notification.duration);
  }
}
