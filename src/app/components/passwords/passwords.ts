import { Component, effect, inject, input, output, ViewChild } from '@angular/core';
import { Password } from '../../models/Password';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { PasswordContainer } from './password-container/password-container';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DeletePasswordDialog } from '../dialogs/delete-password-dialog/delete-password-dialog';
import { EditPasswordDialog } from '../dialogs/edit-password-dialog/edit-password-dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-passwords',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    PasswordContainer,
    ClipboardModule,
    MatButtonModule,
    MatSortModule,
    MatRipple,
  ],
  templateUrl: './passwords.html',
  styleUrl: './passwords.scss',
})
export class Passwords {
  private snackBar = inject(MatSnackBar);
  displayedColumns: string[] = ['id', 'title', 'username', 'email', 'password', 'actions'];
  passwords = input<Password[] | null>();
  dataSource = new MatTableDataSource<Password>(this.passwords() ?? []);
  dialog = inject(MatDialog);
  deletedPasswordId = output<string>();
  editedPassword = output<Password>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      this.dataSource.data = this.passwords() ?? [];
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    });
  }

  handleDeleteClick(id: string, title: string) {
    const dialogRef = this.dialog.open(DeletePasswordDialog, {
      data: { id, title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) this.deletedPasswordId.emit(result);
    });
  }

  handleEditClick(password: Password) {
    const dialogRef = this.dialog.open(EditPasswordDialog, {
      data: { ...password },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) this.editedPassword.emit(result);
    });
  }

  handleCopyToClipboard() {
    this.snackBar.open('Copied to clipboard', 'Close', { duration: 3000 });
  }
}
