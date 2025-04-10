// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCz2oOJVCbYtEonFbvL-KO2q6N4RDuJvsM',
    authDomain: 'pragma-ionic.firebaseapp.com',
    projectId: 'pragma-ionic',
    storageBucket: 'pragma-ionic.firebasestorage.app',
    messagingSenderId: '344735978238',
    appId: '1:344735978238:android:a489e059b7302f13ad8baf',
    measurementId: '', // Este no está en el JSON, puedes dejarlo vacío si no usas Analytics
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
