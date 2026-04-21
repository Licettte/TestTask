import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { NotificationService } from 'shared/services/notification.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="toast-container">
      <div
        *ngFor="let message of notificationService.messages()"
        class="toast"
        [class.toast--success]="message.type === 'success'"
        [class.toast--error]="message.type === 'error'">
        {{ message.text }}
      </div>
    </div>
  `,
  styleUrl: './toast-container.component.scss'
})
export class ToastContainerComponent {
  protected readonly notificationService = inject(NotificationService);
}
