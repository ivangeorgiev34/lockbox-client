export default interface IEnvironment {
  production: boolean;
  msal: {
    clientId: string;
    authority: string;
    redirectUri: string;
    scopes: string[];
    azureFunctionsUrls: {
      getPasswordFunc: string;
      getAllPasswordFunc: string;
      createPasswordFunc: string;
      deletePasswordFunc: string;
      updatePasswordFunc: string;
    };
  };
}
