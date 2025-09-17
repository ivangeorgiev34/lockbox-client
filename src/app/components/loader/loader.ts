import { Component, inject, signal } from '@angular/core';
import { LoaderService } from '../../services/loader-service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  private loaderService = inject(LoaderService);

  isLoading() {
    return this.loaderService.isLoading();
  }
}
