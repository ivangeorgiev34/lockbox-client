import { Component, inject, input, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-password-container',
  imports: [MatIcon, MatTableModule, MatIconButton, CdkCopyToClipboard, MatRipple],
  templateUrl: './password-container.html',
  styleUrl: './password-container.scss',
})
export class PasswordContainer {
  private snackBar = inject(MatSnackBar);
  password = input<string>();
  isVisible = signal<boolean>(false);

  handleToggle() {
    this.isVisible.update((prev) => !prev);
  }

  handleCopyToClipboard() {
    if (this.isVisible()) this.snackBar.open('Copied to clipboard', 'Close', { duration: 3000 });
  }
}
