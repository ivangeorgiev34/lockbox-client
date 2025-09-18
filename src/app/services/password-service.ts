import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private http = inject(HttpClient);

  delete(id: string, token: string) {
    return this.http.delete<ApiResponse<null>>(
      `${environment.msal.azureFunctionsUrls.deletePasswordFunc}?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
