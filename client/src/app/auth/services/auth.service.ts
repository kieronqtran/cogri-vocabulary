import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, flatMap, take, tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import Auth from '@aws-amplify/auth';
import * as Cookie from 'js-cookie';
import { CognitoUser, CognitoUserSession, AuthenticationDetails } from 'amazon-cognito-identity-js';

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
			flatMap<CognitoUser, CognitoUserSession>(cognitoUser => {
				if (!cognitoUser.getSignInUserSession()) {
					return new Observable<CognitoUserSession>(subscriber => {
							const authenticationDetails = new AuthenticationDetails({
								Username: email,
								Password: password
							});
							cognitoUser.authenticateUser(authenticationDetails, {
								// newPasswordRequired: function (userAttributes, requiredAttributes) {
								// 		// User was signed up by an admin and must provide new
								// 		// password and required attributes, if any, to complete
								// 		// authentication.
								// 	const userAttribute = {
								// 		...userAttributes,
								// 		name: 'Kieron Tran',
								// 		given_name: 'Kieron',
								// 		family_name: 'Tran'
								// 	}
								// 	delete userAttribute.email_verified;
								// 	delete userAttribute.phone_number_verified;
								// 		// the api doesn't accept this field back
								// 		cognitoUser.completeNewPasswordChallenge('VuSAi4zRmO7%@@Zt%!e0YW', userAttribute, {
								// 				onSuccess: function (result) {
								// 					resolve(userAttributes)
								// 				},
								// 				onFailure: function (err) {
								// 					reject(err)
								// 				}
								// 		});
								// },
								onSuccess: function (result) {
									subscriber.next(result);
								},
								onFailure: function (err) {
									subscriber.error(err);
								}
						});
					});
				}
				return of(cognitoUser.getSignInUserSession());
			}),
			take(1),
			map(e => e.getIdToken().decodePayload() as User),
		);
  }

  logout() {
    return of(Auth.signOut().then(e => {
			const userId = Cookie.get(`CognitoIdentityServiceProvider.${environment.amplify.Auth.userPoolWebClientId}.LastAuthUser`);
			Cookie.remove(`CognitoIdentityServiceProvider.${environment.amplify.Auth.userPoolWebClientId}.${userId}.idToken`);
			Cookie.remove(`CognitoIdentityServiceProvider.${environment.amplify.Auth.userPoolWebClientId}.${userId}.accessToken`);
			Cookie.remove(`CognitoIdentityServiceProvider.${environment.amplify.Auth.userPoolWebClientId}.${userId}.clockDrift`);
			Cookie.remove(`CognitoIdentityServiceProvider.${environment.amplify.Auth.userPoolWebClientId}.${userId}.refreshToken`);
			Cookie.remove(`CognitoIdentityServiceProvider.${environment.amplify.Auth.userPoolWebClientId}.LastAuthUser`);
			return e;
		}));
  }
}
