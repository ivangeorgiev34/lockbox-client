import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/ApiResponse';
import { Password } from '../models/Password';

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

  private getOptions(token: string, params?: HttpParams) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    };
  }
}
