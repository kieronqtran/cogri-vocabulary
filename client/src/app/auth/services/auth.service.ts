import { Injectable } from '@angular/core';
import { Observable, from, of, throwError, bindNodeCallback } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

import Auth, { CookieStorage } from '@aws-amplify/auth';
import { CognitoUser, UserData, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { environment } from '@env/environment';

import { Credentials, User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
		Auth.configure(environment.amplify.Auth);
	}

  login({ email, password }: Credentials): Observable<User> {
		return from(Auth.signIn(email, password))
		.pipe(
			flatMap<CognitoUser, any>(async cognitoUser => {
				if (cognitoUser.getSignInUserSession() === null) {
					return new Promise((resolve, reject) => {

						const authenticationDetails = new AuthenticationDetails({
							Username: email,
							Password: password
						});

						cognitoUser.authenticateUser(authenticationDetails, {
							newPasswordRequired: function (userAttributes, requiredAttributes) {
									// User was signed up by an admin and must provide new
									// password and required attributes, if any, to complete
									// authentication.
								const userAttribute = {
									...userAttributes,
									name: 'Kieron Tran',
									given_name: 'Kieron',
									family_name: 'Tran'
								}
								delete userAttribute.email_verified;
								delete userAttribute.phone_number_verified;
									// the api doesn't accept this field back
									cognitoUser.completeNewPasswordChallenge('VuSAi4zRmO7%@@Zt%!e0YW', userAttribute, {
											onSuccess: function (result) {
												resolve(userAttributes)
											},
											onFailure: function (err) {
												reject(err)
											}
									});
							},
							onSuccess: function (result) {
								resolve(result);
							},
							onFailure: function (err) {
								reject(err);
							}
					});
					})
				}
				return cognitoUser.getSignInUserSession()
			}),
			map(e => ({name: e})));
  }

  logout() {
    return of(true);
  }
}
