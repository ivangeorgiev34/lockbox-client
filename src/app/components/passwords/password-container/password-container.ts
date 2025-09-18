import { Component, inject, input, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-password-container',
  imports: [MatIcon, MatTableModule, MatIconButton, CdkCopyToClipboard],
  templateUrl: './password-container.html',
  styleUrl: './password-container.scss',
})
export class PasswordContainer {
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  constructor() {
    this.matIconRegistry.addSvgIcon(
      'eye',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/eye.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'hidden-eye',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/hidden-eye.svg')
    );
  }

  password = input<string>();
  isVisible = signal<boolean>(false);

  handleToggle() {
    this.isVisible.update((prev) => !prev);
  }
}
