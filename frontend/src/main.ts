import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from 'app/app/app.component';
import { httpErrorInterceptor } from 'shared/api/interceptors/http-error.interceptor';
import { loaderInterceptor } from 'shared/api/interceptors/loader.interceptor';
import { DriverRecordsPageComponent } from 'pages/driver-records-page/driver-records-page.component';

const routes: Routes = [
  {
    path: '',
    component: DriverRecordsPageComponent
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loaderInterceptor, httpErrorInterceptor]))
  ]
}).catch((error) => console.error(error));
