import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoaderService } from 'shared/services/loader.service';

@Component({
  selector: 'app-global-loader',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="loader-backdrop" *ngIf="loaderService.isVisible()">
      <div class="loader-spinner"></div>
    </div>
  `,
  styleUrl: './global-loader.component.scss'
})
export class GlobalLoaderComponent {
  protected readonly loaderService = inject(LoaderService);
}
