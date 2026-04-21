import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DriverRecordSearchStore } from '../model/driver-record-search.store';
import { withSearchDebounce } from 'shared/utils/debounce.util';

@Component({
  selector: 'app-driver-record-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <label class="search-box">
      <span class="visually-hidden">Поиск</span>
      <input
        [formControl]="searchControl"
        class="search-box__input"
        type="text"
        placeholder="Поиск по имени, фамилии, отчеству или городу" />
    </label>
  `,
  styleUrl: './driver-record-search.component.scss'
})
export class DriverRecordSearchComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly driverRecordSearchStore = inject(DriverRecordSearchStore);

  protected readonly searchControl = new FormControl('', { nonNullable: true });

  constructor() {
    withSearchDebounce(this.searchControl.valueChanges)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((searchTerm) => this.driverRecordSearchStore.updateSearchTerm(searchTerm));
  }
}
