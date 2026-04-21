import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ui-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <label class="checkbox-field">
      <input type="checkbox" [formControl]="control" />
      <span>{{ label }}</span>
    </label>

    <span *ngIf="showError" class="checkbox-field__error">{{ errorText }}</span>
  `,
  styleUrls: ['./ui-checkbox.component.scss']
})
export class UiCheckboxComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label = '';
  @Input() errorText = '';

  get showError(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }
}
