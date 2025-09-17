import { PublicClientApplication, IPublicClientApplication } from '@azure/msal-browser';
import { InteractionType } from '@azure/msal-browser';
import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { environment } from '../environments/environment';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: environment.msal,
    cache: {
      cacheLocation: 'sessionStorage',
      secureCookies: true,
    },
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map([['https://graph.microsoft.com/v1.0/me', ['user.read']]]),
  };
}
