import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './components/home/home';
import { Loader } from './components/loader/loader';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Home, CommonModule, Loader],
})
export class App {
  private domSanitizer = inject(DomSanitizer);
  private matIconRegistry = inject(MatIconRegistry);

  constructor() {
    this.matIconRegistry.addSvgIcon(
      'eye',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/eye.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'hidden-eye',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/hidden-eye.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'dice',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/dice.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'moon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/moon.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'sun',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/sun.svg')
    );
  }
}
