import { FormBuilder, Validators } from '@angular/forms';

export const drivingCategoryOptions = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'BE', label: 'BE' },
  { value: 'CE', label: 'CE' }
];

export function createDriverRecordForm(formBuilder: FormBuilder) {
  const currentYear = new Date().getFullYear();

  return formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    middleName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    birthYear: [null as number | null, [Validators.required, Validators.min(1940), Validators.max(currentYear - 16)]],
    city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    drivingCategory: ['B', [Validators.required]],
    isTuitionPaid: [false, [Validators.required]]
  });
}
