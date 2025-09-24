import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PasswordFactory } from '../../../utils/passwordFactory';
import { PasswordService } from '../../../services/password-service';
import { AuthService } from '../../../services/auth-service';
import { LoaderService } from '../../../services/loader-service';
import { environment } from '../../../../environments/environment';
import { finalize, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export type CreatePasswordModel = {
  title: string;
  username: string;
  email: string;
  password: string;
};

@Component({
  selector: 'app-create-password-dialog',
  imports: [FormsModule, MatDialogModule, MatIcon, MatButtonModule],
  templateUrl: './create-password-dialog.html',
  styleUrl: './create-password-dialog.scss',
})
export class CreatePasswordDialog {
  private domSanitizer = inject(DomSanitizer);
  private matIconRegistry = inject(MatIconRegistry);
  private passwordFactory = inject(PasswordFactory);
  private passwordService = inject(PasswordService);
  private authService = inject(AuthService);
  private loaderService = inject(LoaderService);
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<CreatePasswordDialog>);

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

  model = model<CreatePasswordModel>({
    title: '',
    email: '',
    password: '',
    username: '',
  });
  isVisible = signal<boolean>(false);
  errorMessage = signal<string>('');

  handleSubmit() {
    this.loaderService.enable();

    this.authService
      .getToken(environment.msal.scopes)
      .pipe(
        switchMap((token) => {
          if (!token) throw new Error('No token available');
          return this.passwordService
            .create(token, this.model())
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
}
