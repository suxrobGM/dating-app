// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpoints: {
    api: 'https://localhost:7000',
    id: 'https://localhost:7001',
  },
  storage: {
    bucketName: 'dating-app-bucket',
    accessKeyId: 'AKIATOZQD5Y2TXAEDS5L',
    secretAccessKey: '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',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
