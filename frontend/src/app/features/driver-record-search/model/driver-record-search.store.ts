import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DriverRecordSearchStore {
  readonly searchTerm$ = new BehaviorSubject<string>('');

  updateSearchTerm(searchTerm: string): void {
    this.searchTerm$.next(searchTerm);
  }
}
