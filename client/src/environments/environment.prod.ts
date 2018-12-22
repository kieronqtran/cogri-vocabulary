const packageJson = require('../../package.json');

export const environment = {
  appName: 'Cogri Vocabulary',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '/angular-ngrx-material-starter',
  apiUrl: `${window.location.origin}/api`,
  amplify: {
    Auth: {
      identityPoolId: 'us-east-us-east-1:06445a57-7db2-4e37-936b-ac2e1bc9044a',
      region: 'us-east-1',
      identityPoolRegion: 'us-east-1',
      userPoolId: 'us-east-1_NRZHxhBEi',
      userPoolWebClientId: '4a9rqtsq4g3o6vhevbvcho46nv',
      cookieStorage: {
        domain: 'cogri-vocabulary.tranhuuquang.me',
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
      'https://corgi-vocabulary.tranhuuquang.me/word',
    ],

    // Callback URL
    redirectSignIn: 'https://cogri-vocabulary.tranhuuquang.me/login/callback',

    // Sign out URL
    redirectSignOut: 'https://cogri-vocabulary.tranhuuquang.me/logout/callback',

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
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
  },
};
