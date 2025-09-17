import IEnvironment from './IEnvironment';

export const environment: IEnvironment = {
  production: true,
  msal: {
    clientId: 'db23ea7c-654d-4e10-bcbf-e552e1a547a8',
    authority: 'https://login.microsoftonline.com/cb59711e-a821-4825-86e3-ade5bb643179',
    redirectUri: 'https://mango-river-04ce79b03.1.azurestaticapps.net',
    scopes: ['api://67b904df-47db-478a-acb6-75ded49cca7c/access_as_user'],
    azureFunctionsUrls: {
      getPasswordFunc:
        'https://api-lockbox-e4cmacbscsd3ftah.westeurope-01.azurewebsites.net/api/GetPasswordFunc',
      getAllPasswordFunc:
        'https://api-lockbox-e4cmacbscsd3ftah.westeurope-01.azurewebsites.net/api/GetAllPasswordsFunc',
      createPasswordFunc:
        'https://api-lockbox-e4cmacbscsd3ftah.westeurope-01.azurewebsites.net/api/CreatePasswordFunc',
      updatePasswordFunc:
        'https://api-lockbox-e4cmacbscsd3ftah.westeurope-01.azurewebsites.net/api/UpdatePasswordFunc',
      deletePasswordFunc:
        'https://api-lockbox-e4cmacbscsd3ftah.westeurope-01.azurewebsites.net/api/DeletePasswordFunc',
    },
  },
};
