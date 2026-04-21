import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';

export function withSearchDebounce<T>(stream$: Observable<T>, debounceMs = 350): Observable<T> {
  return stream$.pipe(
    debounceTime(debounceMs),
    distinctUntilChanged()
  );
}

