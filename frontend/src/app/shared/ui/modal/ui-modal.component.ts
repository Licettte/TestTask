import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ui-modal',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="modal-backdrop" *ngIf="isOpen" (click)="backdropClick()">
      <div class="modal-card card" (click)="$event.stopPropagation()">
        <div class="modal-card__header">
          <h2>{{ title }}</h2>
          <button class="modal-card__close" type="button" (click)="close.emit()">×</button>
        </div>

        <div class="modal-card__content">
          <ng-content />
        </div>
      </div>
    </div>
  `,
  styleUrl: './ui-modal.component.scss'
})
export class UiModalComponent {
  @Input({ required: true }) isOpen!: boolean;
  @Input({ required: true }) title!: string;

  @Output() readonly close = new EventEmitter<void>();

  backdropClick(): void {
    this.close.emit();
  }
}
