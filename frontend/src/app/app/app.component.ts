import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalLoaderComponent } from 'shared/ui/global-loader/global-loader.component';
import { ToastContainerComponent } from 'shared/ui/toast-container/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GlobalLoaderComponent, ToastContainerComponent],
  template: `
    <app-global-loader />
    <app-toast-container />
    <router-outlet />
  `
})
export class AppComponent {}
