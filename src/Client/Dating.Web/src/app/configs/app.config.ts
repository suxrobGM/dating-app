import {environment as env} from '../../environments/environment';

export const AppConfig = {
  apiHost: env.endpoints.api,
  idHost: env.endpoints.id,
  storage: {
    bucketName: env.storage.bucketName,
    accessKeyId: env.storage.accessKeyId,
    secretAccessKey: env.storage.secretAccessKey,
  },
};
