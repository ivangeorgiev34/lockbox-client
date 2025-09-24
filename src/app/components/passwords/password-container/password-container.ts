import { Component, inject, input, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-password-container',
  imports: [MatIcon, MatTableModule, MatIconButton, CdkCopyToClipboard],
  templateUrl: './password-container.html',
  styleUrl: './password-container.scss',
})
export class PasswordContainer {
  password = input<string>();
  isVisible = signal<boolean>(false);

  handleToggle() {
    this.isVisible.update((prev) => !prev);
  }
}
