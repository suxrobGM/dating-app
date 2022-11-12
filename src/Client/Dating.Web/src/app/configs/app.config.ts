import {environment} from '../../environments/environment';

export const AppConfig = {
  apiHost: environment.apiHost,
  idHost: environment.idHost,
  storage: {
    keys: {
      user: 'User',
    },
  },
};
