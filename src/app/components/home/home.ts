import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { environment } from '../../../environments/environment';
import { finalize, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Password } from '../../models/Password';
import { ApiResponse } from '../../models/ApiResponse';
import { LoaderService } from '../../services/loader-service';
import { MatButtonModule } from '@angular/material/button';
import { Passwords } from '../passwords/passwords';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, Passwords],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);
  private loaderService = inject(LoaderService);

  passwords = signal<Password[] | null>([
    {
      id: '8a7a7bc8-6384-42c5-8c49-87f8cdd4749a',
      title: 'test',
      username: 'test',
      email: 'example@gmail.com',
      password: 'pass123',
    },
    {
      id: 'ed7b6a33-b4b9-43a2-ad9c-19fee98d9e24',
      title: 'test',
      username: 'test',
      email: 'example@gmail.com',
      password: 'pass123',
    },
    {
      id: 'eaebbc91-0a89-43a1-8d7a-da8284f4c784',
      title: 'test',
      username: 'test',
      email: 'example@gmail.com',
      password: 'pass123',
    },
    {
      id: 'a5eb419a-4f14-47c4-b320-cdacb2ad1283',
      title: 'test',
      username: 'test',
      email: 'example@gmail.com',
      password: 'pass123',
    },
    {
      id: 'c0ae5645-5091-4cf3-a8f2-7b91bd9e6cf5',
      title: 'test',
      username: 'test',
      email: 'example@gmail.com',
      password: 'pass123',
    },
    {
      id: '6219ab44-368b-47fd-8172-d5b2c82d5968',
      title: 'test',
      email: 'example@gmail.com',
      password: 'pass123',
      username: 'eee',
    },
  ]);

  ngOnInit(): void {
    this.loaderService.enable();
    // this.authService
    //   .getToken(environment.msal.scopes)
    //   .pipe(
    //     switchMap((token) => {
    //       if (!token) throw new Error('No token available');
    //       return this.httpClient.get<ApiResponse<Password[]>>(
    //         environment.msal.azureFunctionsUrls.getAllPasswordFunc,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       );
    //     }),
    //     finalize(() => {
    //       this.loaderService.disable();
    //     })
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       if (!response.success) throw new Error(response.message);
    //       this.passwords.set(response.content);
    //     },
    //     error: (err) => console.error('Error:', err),
    //   });

    setTimeout(() => {
      this.loaderService.disable();
    }, 1000);
  }
}
