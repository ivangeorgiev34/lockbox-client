import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/ApiResponse';
import { Password } from '../models/Password';

type UpdatePasswordBody = {
  title: string;
  username: string;
  email: string;
  password: string;
};
@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private http = inject(HttpClient);

  delete(id: string, token: string) {
    return this.http.delete<ApiResponse<null>>(
      environment.msal.azureFunctionsUrls.deletePasswordFunc,
      this.getOptions(token, new HttpParams().append('id', id))
    );
  }

  getAll(token: string) {
    return this.http.get<ApiResponse<Password[]>>(
      environment.msal.azureFunctionsUrls.getAllPasswordFunc,
      this.getOptions(token)
    );
  }

  update(token: string, password: Password) {
    const body = {
      title: password.title,
      email: password.email,
      username: password.username,
      password: password.password,
    };

    return this.http.patch<ApiResponse<Password>>(
      environment.msal.azureFunctionsUrls.updatePasswordFunc,
      body,
      this.getOptions<UpdatePasswordBody>(token, new HttpParams().append('id', password.id))
    );
  }

  private getOptions<T>(token: string, params?: HttpParams) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    };
  }
}
