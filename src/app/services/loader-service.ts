import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading = signal(false);

  disable() {
    this.isLoading.set(false);
  }

  enable() {
    this.isLoading.set(true);
  }
}
