import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { DriverRecordsApi } from 'entities/driver-record/api/driver-records.api';
import { DriverRecordBase } from 'entities/driver-record/model/driver-record.base';
import { NotificationService } from 'shared/services/notification.service';
import { UiButtonComponent } from 'shared/ui/button/ui-button.component';
import { UiCheckboxComponent } from 'shared/ui/checkbox/ui-checkbox.component';
import { UiInputComponent } from 'shared/ui/input/ui-input.component';
import { UiModalComponent } from 'shared/ui/modal/ui-modal.component';
import { UiSelectComponent } from 'shared/ui/select/ui-select.component';
import { createDriverRecordForm, drivingCategoryOptions } from '../model/create-driver-record-form.factory';

@Component({
  selector: 'app-create-driver-record-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UiModalComponent,
    UiInputComponent,
    UiSelectComponent,
    UiCheckboxComponent,
    UiButtonComponent
  ],
  templateUrl: './create-driver-record-modal.component.html',
  styleUrl: './create-driver-record-modal.component.scss'
})
export class CreateDriverRecordModalComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly driverRecordsApi = inject(DriverRecordsApi);
  private readonly notificationService = inject(NotificationService);

  protected readonly formGroup = createDriverRecordForm(this.formBuilder);
  protected readonly isSubmitting = signal(false);
  protected readonly drivingCategoryOptions = drivingCategoryOptions;

  @Output() readonly close = new EventEmitter<void>();
  @Output() readonly created = new EventEmitter<void>();

  protected submitForm(): void {
    if (this.isSubmitting()) {
      return;
    }

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.notificationService.showError('Проверьте форму. Есть пустые или некорректные поля.');
      return;
    }

    const formValue = this.formGroup.getRawValue();

    const payload: DriverRecordBase = {
      firstName: `${formValue.firstName}`.trim(),
      lastName: `${formValue.lastName}`.trim(),
      middleName: `${formValue.middleName}`.trim(),
      birthYear: Number(formValue.birthYear),
      city: `${formValue.city}`.trim(),
      drivingCategory: `${formValue.drivingCategory}`,
      isTuitionPaid: Boolean(formValue.isTuitionPaid)
    };

    this.isSubmitting.set(true);

    this.driverRecordsApi.create(payload)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Запись успешно добавлена.');
          this.created.emit();
          this.close.emit();
          this.formGroup.reset({
            firstName: '',
            lastName: '',
            middleName: '',
            birthYear: null,
            city: '',
            drivingCategory: 'B',
            isTuitionPaid: false
          });
        }
      });
  }
}
