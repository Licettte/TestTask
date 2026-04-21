import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private readonly requestsInProgressCount = signal(0);
  readonly isVisible = signal(false);

  show(): void {
    this.requestsInProgressCount.update((count) => count + 1);
    this.isVisible.set(true);
  }

  hide(): void {
    this.requestsInProgressCount.update((count) => Math.max(count - 1, 0));
    this.isVisible.set(this.requestsInProgressCount() > 0);
  }
}
