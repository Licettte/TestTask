import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from 'shared/api/models/api-response.model';

@Injectable({ providedIn: 'root' })
export class HttpClientService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiBaseUrl = environment.apiBaseUrl;

  get<TResponse>(path: string, params?: Record<string, string | number | boolean | undefined>): Observable<ApiResponse<TResponse>> {
    return this.httpClient.get<ApiResponse<TResponse>>(this.buildUrl(path), {
      params: this.createHttpParams(params)
    });
  }

  post<TRequest, TResponse>(path: string, body: TRequest): Observable<ApiResponse<TResponse>> {
    return this.httpClient.post<ApiResponse<TResponse>>(this.buildUrl(path), body);
  }

  patch<TRequest, TResponse>(path: string, body: TRequest): Observable<ApiResponse<TResponse>> {
    return this.httpClient.patch<ApiResponse<TResponse>>(this.buildUrl(path), body);
  }

  private buildUrl(path: string): string {
    return `${this.apiBaseUrl}/${path}`;
  }

  private createHttpParams(params?: Record<string, string | number | boolean | undefined>): HttpParams | undefined {
    if (!params) {
      return undefined;
    }

    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && `${value}`.trim() !== '') {
        httpParams = httpParams.set(key, value);
      }
    });

    return httpParams;
  }
}
