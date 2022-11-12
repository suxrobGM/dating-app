import {environment} from '../../environments/environment';

export const AppConfig = {
  apiHost: environment.endpoints.api,
  idHost: environment.endpoints.id,
  storage: {
    bucketName: environment.storage.bucketName,
    bucketUrl: environment.storage.bucketUrl,
    keyId: environment.storage.keyId,
    keySecret: environment.storage.keySecret,
  },
};
