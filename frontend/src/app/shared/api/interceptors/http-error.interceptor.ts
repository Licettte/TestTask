import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { NotificationService } from 'shared/services/notification.service';

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const notificationService = inject(NotificationService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const fallbackMessage = 'Произошла ошибка. Попробуйте ещё раз.';
      const backendMessage = typeof error.error?.message === 'string' ? error.error.message : '';
      const message = backendMessage || fallbackMessage;

      notificationService.showError(message);

      return throwError(() => error);
    })
  );
};
