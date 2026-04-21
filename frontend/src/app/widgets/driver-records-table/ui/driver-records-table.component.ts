import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DriverRecord } from 'entities/driver-record/model/driver-record.model';

@Component({
  selector: 'app-driver-records-table',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './driver-records-table.component.html',
  styleUrl: './driver-records-table.component.scss'
})
export class DriverRecordsTableComponent {
  @Input({ required: true }) records!: DriverRecord[];
  @Input() isUpdatingPaymentId: string | null = null;

  @Output() readonly paymentStatusToggled = new EventEmitter<DriverRecord>();

  protected trackByRecordId(_: number, record: DriverRecord): string {
    return record.id;
  }
}
