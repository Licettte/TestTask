import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClientService } from 'shared/api/services/http-client.service';
import { DriverRecord } from 'entities/driver-record/model/driver-record.model';
import { DriverRecordBase } from 'entities/driver-record/model/driver-record.base';
import { UpdatePaymentStatusPayload } from 'entities/driver-record/model/update-payment-status.payload';

@Injectable({ providedIn: 'root' })
export class DriverRecordsApi {
  private readonly httpClientService = inject(HttpClientService);

  getList(search?: string): Observable<DriverRecord[]> {
    return this.httpClientService
      .get<DriverRecord[]>('driver-records', { search })
      .pipe(map((response) => response.data));
  }

  create(payload: DriverRecordBase): Observable<DriverRecord> {
    return this.httpClientService
      .post<DriverRecordBase, DriverRecord>('driver-records', payload)
      .pipe(map((response) => response.data));
  }

  updatePaymentStatus(recordId: string, payload: UpdatePaymentStatusPayload): Observable<DriverRecord> {
    return this.httpClientService
      .patch<UpdatePaymentStatusPayload, DriverRecord>(`driver-records/${recordId}/payment-status`, payload)
      .pipe(map((response) => response.data));
  }
}
