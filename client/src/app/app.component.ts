import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { routeAnimations, AppState, LocalStorageService } from '@app/core';
import { AuthActions, AuthApiActions } from '@app/auth/actions';
import { selectIsAuthenticated, selectIsAdmin } from '@app/auth/reducers';
import { environment as env } from '@env/environment';

import {
  ActionSettingsChangeLanguage,
  ActionSettingsChangeAnimationsPageDisabled,
  selectEffectiveTheme,
  selectSettingsLanguage,
  selectSettingsStickyHeader,
} from './settings';

@Component({
  selector: 'anms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent implements OnInit {
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');
  languages = ['en', 'de', 'sk', 'fr', 'es', 'pt-br'];
  navigation = [
    { link: 'about', label: 'anms.menu.about' },
    { link: 'features', label: 'anms.menu.features' },
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'anms.menu.settings' },
  ];

  isAuthenticated$: Observable<boolean> = this.store.pipe(
    select(selectIsAuthenticated),
  );

  isAdmin$: Observable<boolean> = this.store.pipe(select(selectIsAdmin));

  stickyHeader$: Observable<boolean> = this.store.pipe(
    select(selectSettingsStickyHeader),
  );
  language$: Observable<string> = this.store.pipe(
    select(selectSettingsLanguage),
  );
  theme$: Observable<string> = this.store.pipe(select(selectEffectiveTheme));

  constructor(
    private store: Store<AppState>,
    private storageService: LocalStorageService,
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        new ActionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true,
        }),
      );
    }
  }

  onLoginClick() {
    this.store.dispatch(new AuthApiActions.LoginRedirect());
  }

  onSignUpClick() {
    this.store.dispatch(new AuthApiActions.SignUpRedirect());
  }

  onLogoutClick() {
    this.store.dispatch(new AuthActions.LogoutConfirmation());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
  }
}
