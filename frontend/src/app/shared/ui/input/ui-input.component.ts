import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ui-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <label class="input-field">
      <span *ngIf="label" class="input-field__label">{{ label }}</span>

      <input
        class="input-field__control"
        [type]="type"
        [placeholder]="placeholder"
        [formControl]="control" />

      <span *ngIf="hint" class="input-field__hint">{{ hint }}</span>

      <span *ngIf="showError" class="input-field__error">{{ errorText }}</span>
    </label>
  `,
  styleUrls: ['./ui-input.component.scss']
})
export class UiInputComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() hint = '';
  @Input() type = 'text';
  @Input() errorText = '';

  get showError(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }
}
