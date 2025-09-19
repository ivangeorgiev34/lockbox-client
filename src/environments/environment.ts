import IEnvironment from './IEnvironment';

export const environment: IEnvironment = {
  production: false,
  msal: {
    clientId: 'db23ea7c-654d-4e10-bcbf-e552e1a547a8',
    authority: 'https://login.microsoftonline.com/cb59711e-a821-4825-86e3-ade5bb643179',
    redirectUri: 'http://localhost:4200',
    scopes: ['api://67b904df-47db-478a-acb6-75ded49cca7c/access_as_user'],
    azureFunctionsUrls: {
      getPasswordFunc: 'http://localhost:7071/api/GetPasswordFunc',
      getAllPasswordFunc: 'http://localhost:7071/api/GetAllPasswordsFunc',
      createPasswordFunc: 'http://localhost:7071/api/CreatePasswordFunc',
      updatePasswordFunc: 'http://localhost:7071/api/UpdatePasswordFunc',
      deletePasswordFunc: 'http://localhost:7071/api/DeletePasswordFunc',
    },
    passwordOptions: {
      excludeSimilarCharacters: true,
      exclude: "'`~",
      length: 20,
      symbols: true,
      numbers: true,
      strict: true,
    },
  },
};
