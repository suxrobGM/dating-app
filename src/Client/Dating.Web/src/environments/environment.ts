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
    bucketName: 'dating-blob',
    bucketUrl: 'https://pub-ee5064af9b004182853494624cb9531b.r2.dev',
    keyId: '84ee7b2f7509d1f6ecfb3ad7339ffea7',
    keySecret: 'e24238bb6a9063c1c94d9be4c3a634b592b2a3026b6e78b513dfa2387c92df6e',
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
