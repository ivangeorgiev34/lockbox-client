import { AfterViewInit, Component, input, OnInit, ViewChild } from '@angular/core';
import { Password } from '../../models/Password';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { PasswordContainer } from './password-container/password-container';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-passwords',
  imports: [MatTableModule, MatPaginatorModule, PasswordContainer, ClipboardModule],
  templateUrl: './passwords.html',
  styleUrl: './passwords.scss',
})
export class Passwords implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'username', 'email', 'password'];
  passwords = input<Password[] | null>();
  dataSource = new MatTableDataSource<Password>(this.passwords() ?? []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource.data = this.passwords() ?? [];
  }

  handleCopyToClipboardCopied() {}
}
