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
        identityPoolId: 'us-east-1_NRZHxhBEi',
        region: 'us-east-1',
        identityPoolRegion: 'us-east-1',
        userPoolId: 'us-east-1_NRZHxhBEi',
        userPoolWebClientId: '2749ghbf9qp5npco089l0vfh6',
        cookieStorage: {
            domain: 'cogri-vocabulary.tranhuuquang.me',
            path: '/',
            expires: 365,
            secure: false
        },
    }
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
