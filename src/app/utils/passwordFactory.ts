import { generate } from 'generate-password-browser';
import { environment } from '../../environments/environment';

export class PasswordFactory {
  generate() {
    return generate(environment.msal.passwordOptions);
  }
}
