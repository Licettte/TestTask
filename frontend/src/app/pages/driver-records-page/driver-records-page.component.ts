import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { finalize, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DriverRecordsApi } from 'entities/driver-record/api/driver-records.api';
import { DriverRecord } from 'entities/driver-record/model/driver-record.model';
import { DriverRecordSearchStore } from 'features/driver-record-search/model/driver-record-search.store';
import { DriverRecordSearchComponent } from 'features/driver-record-search/ui/driver-record-search.component';
import { CreateDriverRecordModalComponent } from 'features/create-driver-record/ui/create-driver-record-modal.component';
import { NotificationService } from 'shared/services/notification.service';
import { UiButtonComponent } from 'shared/ui/button/ui-button.component';
import { DriverRecordsTableComponent } from 'widgets/driver-records-table/ui/driver-records-table.component';

@Component({
  selector: 'app-driver-records-page',
  standalone: true,
  providers: [DriverRecordSearchStore],
  imports: [
    NgIf,
    UiButtonComponent,
    DriverRecordSearchComponent,
    DriverRecordsTableComponent,
    CreateDriverRecordModalComponent
  ],
  templateUrl: './driver-records-page.component.html',
  styleUrl: './driver-records-page.component.scss'
})
export class DriverRecordsPageComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly driverRecordsApi = inject(DriverRecordsApi);
  private readonly driverRecordSearchStore = inject(DriverRecordSearchStore);
  private readonly notificationService = inject(NotificationService);

  protected readonly records = signal<DriverRecord[]>([]);
  protected readonly isCreateModalOpen = signal(false);
  protected readonly isListRefreshing = signal(false);
  protected readonly updatingPaymentRecordId = signal<string | null>(null);

  constructor() {
    this.driverRecordSearchStore.searchTerm$
      .pipe(
        switchMap((searchTerm) => {
          this.isListRefreshing.set(true);

          return this.driverRecordsApi
            .getList(searchTerm)
            .pipe(finalize(() => this.isListRefreshing.set(false)));
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (records) => this.records.set(records)
      });
  }

  protected refreshList(): void {
    this.driverRecordSearchStore.updateSearchTerm(this.driverRecordSearchStore.searchTerm$.value);
  }

  protected openCreateModal(): void {
    this.isCreateModalOpen.set(true);
  }

  protected closeCreateModal(): void {
    this.isCreateModalOpen.set(false);
  }

  protected handleRecordCreated(): void {
    this.refreshList();
  }

  protected togglePaymentStatus(record: DriverRecord): void {
    if (this.updatingPaymentRecordId()) {
      return;
    }

    this.updatingPaymentRecordId.set(record.id);

    this.driverRecordsApi.updatePaymentStatus(record.id, {
      isTuitionPaid: !record.isTuitionPaid
    })
      .pipe(finalize(() => this.updatingPaymentRecordId.set(null)))
      .subscribe({
        next: (updatedRecord) => {
          this.records.update((records) =>
            records.map((currentRecord) =>
              currentRecord.id === updatedRecord.id ? updatedRecord : currentRecord
            )
          );

          this.notificationService.showSuccess('Статус оплаты обновлён.');
        }
      });
  }
}
