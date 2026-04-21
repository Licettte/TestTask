import { Injectable, signal } from '@angular/core';

export type ToastMessage = {
  id: number;
  type: 'success' | 'error';
  text: string;
};

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private nextId = 1;
  readonly messages = signal<ToastMessage[]>([]);

  showSuccess(text: string): void {
    this.pushMessage('success', text);
  }

  showError(text: string): void {
    this.pushMessage('error', text);
  }

  remove(id: number): void {
    this.messages.update((messages) => messages.filter((message) => message.id !== id));
  }

  private pushMessage(type: ToastMessage['type'], text: string): void {
    const id = this.nextId++;
    this.messages.update((messages) => [...messages, { id, type, text }]);

    window.setTimeout(() => this.remove(id), 3500);
  }
}
