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
        identityPoolId: 'us-east-1_wc2MajHjU',
        region: 'us-east-1',
        identityPoolRegion: 'us-east-1',
        userPoolId: 'us-east-1_wc2MajHjU',
        userPoolWebClientId: 'ulh7ak5vo6kt6natjf6j7r39h',
        cookieStorage: {
            domain: 'localhost',
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
