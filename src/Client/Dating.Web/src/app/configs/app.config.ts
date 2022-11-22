import {environment as env} from '../../environments/environment';

export const AppConfig = {
  apiHost: env.endpoints.api,
  idHost: env.endpoints.id,
  storage: {
    bucketName: env.storage.bucketName,
    bucketUrl: env.storage.bucketUrl,
    accessKey: env.storage.accessKey,
    secretKey: env.storage.secretKey,
  },
};
