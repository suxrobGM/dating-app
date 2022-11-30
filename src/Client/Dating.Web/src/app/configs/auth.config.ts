import {OpenIdConfiguration} from 'angular-auth-oidc-client';
import {AppConfig} from './app.config';

export const AuthConfig: OpenIdConfiguration = {
  authority: AppConfig.idHost,
  postLoginRoute: '/',
  forbiddenRoute: '/forbidden',
  unauthorizedRoute: '/unauthorized',
  redirectUrl: window.location.origin,
  postLogoutRedirectUri: window.location.origin,
  clientId: 'dating.webclient',
  scope: 'openid profile email full_name picture offline_access dating.api.client',
  responseType: 'code',
  silentRenew: true,
  useRefreshToken: true,
  renewTimeBeforeTokenExpiresInSeconds: 30,
};
