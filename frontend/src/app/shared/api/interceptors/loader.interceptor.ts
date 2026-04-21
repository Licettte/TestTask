import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';
import { LoaderService } from 'shared/services/loader.service';

export const loaderInterceptor: HttpInterceptorFn = (request, next) => {
  const loaderService = inject(LoaderService);

  loaderService.show();

  return next(request).pipe(
    finalize(() => loaderService.hide())
  );
};
