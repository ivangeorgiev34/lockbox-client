import { Component, inject, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PasswordService } from '../../../services/password-service';
import { LoaderService } from '../../../services/loader-service';
import { finalize, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth-service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-delete-password-dialog',
  imports: [MatIconModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-password-dialog.html',
  styleUrl: './delete-password-dialog.scss',
})
export class DeletePasswordDialog {
  private passwordService = inject(PasswordService);
  private loaderService = inject(LoaderService);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  private dialog = inject(MatDialogRef<DeletePasswordDialog>);

  data: { id: string; title: string } = inject(MAT_DIALOG_DATA);

  errorMessage = signal<string>('');

  handleDeleteClick() {
    this.loaderService.enable();

    this.authService
      .getToken(environment.msal.scopes)
      .pipe(
        switchMap((token) => {
          if (!token) throw new Error('No token available');
          return this.passwordService
            .delete(this.data.id, token)
            .pipe(finalize(() => this.loaderService.disable()));
        })
      )
      .subscribe({
        next: ({ success, message }) => {
          if (!success) throw new Error(message);

          this.dialog.close(this.data.id);
          this.snackBar.open(message, 'Close', { duration: 3000 });
        },
        error: (err) => this.errorMessage.set(err.error.message),
      });
  }
}
