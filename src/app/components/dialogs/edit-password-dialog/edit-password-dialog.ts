import { Component, inject, model, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Password } from '../../../models/Password';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PasswordFactory } from '../../../utils/passwordFactory';
import { AuthService } from '../../../services/auth-service';
import { PasswordService } from '../../../services/password-service';
import { environment } from '../../../../environments/environment';
import { finalize, switchMap } from 'rxjs';
import { LoaderService } from '../../../services/loader-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-password-dialog',
  imports: [MatDialogModule, MatButtonModule, FormsModule, MatIcon],
  templateUrl: './edit-password-dialog.html',
  styleUrl: './edit-password-dialog.scss',
})
export class EditPasswordDialog {
  private dialogRef = inject(MatDialogRef<EditPasswordDialog>);
  private data = inject<Password>(MAT_DIALOG_DATA);
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);
  private passwordFactory = inject(PasswordFactory);
  private authService = inject(AuthService);
  private passwordService = inject(PasswordService);
  private loaderService = inject(LoaderService);
  private snackBar = inject(MatSnackBar);

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
  }

  model = model<Password>(this.data);
  isVisible = signal<boolean>(false);
  errorMessage = signal<string>('');

  handlePasswordToggle() {
    this.isVisible.update((prev) => !prev);
  }

  handleGeneratePassword() {
    this.model.update((prev) => ({
      ...prev,
      password: this.passwordFactory.generate(),
    }));
    this.isVisible.set(true);
  }

  handleSubmit() {
    this.loaderService.enable();

    this.authService
      .getToken(environment.msal.scopes)
      .pipe(
        switchMap((token) => {
          if (!token) throw new Error('No token available');
          return this.passwordService
            .update(token, this.model())
            .pipe(finalize(() => this.loaderService.disable()));
        })
      )
      .subscribe({
        next: ({ success, message, content }) => {
          if (!success) throw new Error(message);

          this.dialogRef.close(content);
          this.snackBar.open(message, 'Close', { duration: 3000 });
        },
        error: (err) => this.errorMessage.set(err.error.message),
      });
  }
}
