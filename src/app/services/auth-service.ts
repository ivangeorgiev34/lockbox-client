import { inject, Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private msalService = inject(MsalService);

  getToken(scopes: string[]): Observable<string | null> {
    return this.msalService.initialize().pipe(
      switchMap(() => {
        const accounts = this.msalService.instance.getAllAccounts();
        if (accounts.length === 0) {
          return of(null);
        }

        return this.msalService.acquireTokenSilent({ scopes, account: accounts[0] }).pipe(
          map((res) => res.accessToken),
          catchError(() => of(null))
        );
      })
    );
  }
}
