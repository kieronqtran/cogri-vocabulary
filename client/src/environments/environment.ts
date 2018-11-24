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
				}
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
    fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
  },
};
