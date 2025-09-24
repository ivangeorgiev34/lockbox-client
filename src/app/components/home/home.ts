import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { environment } from '../../../environments/environment';
import { finalize, switchMap } from 'rxjs';
import { Password } from '../../models/Password';
import { LoaderService } from '../../services/loader-service';
import { MatButtonModule } from '@angular/material/button';
import { Passwords } from '../passwords/passwords';
import { PasswordService } from '../../services/password-service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePasswordDialog } from '../dialogs/create-password-dialog/create-password-dialog';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, Passwords],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private authService = inject(AuthService);
  private passwordService = inject(PasswordService);
  private loaderService = inject(LoaderService);
  private dialog = inject(MatDialog);

  passwords = signal<Password[] | null>([]);

  ngOnInit(): void {
    this.loaderService.enable();

    this.authService
      .getToken(environment.msal.scopes)
      .pipe(
        switchMap((token) => {
          if (!token) throw new Error('No token available');
          return this.passwordService.getAll(token).pipe(
            finalize(() => {
              this.loaderService.disable();
            })
          );
        })
      )
      .subscribe({
        next: (response) => {
          if (!response.success) throw new Error(response.message);
          this.passwords.set(response.content);
        },
        error: (err) => console.error('Error:', err),
      });
  }

  handleDeletedPassword(id: string) {
    this.passwords.update((prev) => prev?.filter((x) => x.id !== id) ?? null);
  }

  handleEditedPassword(password: Password) {
    this.passwords.update(
      (prev) => prev?.map((x) => (x.id === password.id ? password : x)) ?? null
    );
  }

  handleCreatePasswordClick() {
    const dialogRef = this.dialog.open(CreatePasswordDialog);

    dialogRef.afterClosed().subscribe((result) => {
      this.passwords.update((prev) => [...(prev ?? []), result]);
    });
  }
}
