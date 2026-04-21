import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export type SelectOption = {
  value: string;
  label: string;
};

@Component({
  selector: 'app-ui-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <label class="select-field">
      <span *ngIf="label" class="select-field__label">{{ label }}</span>

      <select class="select-field__control" [formControl]="control">
        <option *ngFor="let option of options" [value]="option.value">
          {{ option.label }}
        </option>
      </select>

      <span *ngIf="showError" class="select-field__error">{{ errorText }}</span>
    </label>
  `,
  styleUrls: ['./ui-select.component.scss']
})
export class UiSelectComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label = '';
  @Input() errorText = '';
  @Input() options: SelectOption[] = [];

  get showError(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }
}
