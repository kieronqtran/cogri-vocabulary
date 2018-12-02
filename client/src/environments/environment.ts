// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const packageJson = require('../../package.json');

export const environment = {
  appName: 'Cogri Vocabulary',
  envName: 'DEV',
  apiUrl: `${window.location.origin}/api`,
  production: false,
  test: false,
  i18nPrefix: '',
  amplify: {
    Auth: {
      identityPoolId: 'us-east-1:06445a57-7db2-4e37-936b-ac2e1bc9044a',
      region: 'us-east-1',
      identityPoolRegion: 'us-east-1',
      userPoolId: 'us-east-1_NRZHxhBEi',
      userPoolWebClientId: '4a9rqtsq4g3o6vhevbvcho46nv',
      cookieStorage: {
        domain: 'localhost',
        path: '/',
        expires: 365,
        secure: false,
      },
    },
  },
  oauth: {
    domain: 'auth.tranhuuquang.me',

    // Authorized scopes
    scope: [
      'email',
      'profile',
      'openid',
      'aws.cognito.signin.user.admin',
      'https://corgi-vocabulary.tranhuuquang.me/word.readonly',
    ],

    // Callback URL
    redirectSignIn: 'http://localhost:4200/login/callback',

    // Sign out URL
    redirectSignOut: 'http://localhost:4200/logout/callback',

    // 'code' for Authorization code grant,
    // 'token' for Implicit grant
    responseType: 'token',
  },
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
  },
};
