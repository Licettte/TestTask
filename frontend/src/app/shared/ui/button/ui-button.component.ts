import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ui-button',
  standalone: true,
  imports: [NgIf],
  template: `
    <button
      class="button"
      [class.button--secondary]="variant === 'secondary'"
      [class.button--danger]="variant === 'danger'"
      [disabled]="disabled || loading"
      [type]="type"
      (click)="buttonClick.emit()">
      <span *ngIf="!loading">{{ text }}</span>
      <span *ngIf="loading">Загрузка...</span>
    </button>
  `,
  styleUrl: './ui-button.component.scss'
})
export class UiButtonComponent {
  @Input({ required: true }) text!: string;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';

  @Output() readonly buttonClick = new EventEmitter<void>();
}
