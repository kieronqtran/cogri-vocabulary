import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, from, of } from 'rxjs';
import { map, flatMap, take, tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import Auth from '@aws-amplify/auth';
import * as Cookie from 'js-cookie';
import {
  CognitoUser,
  CognitoUserSession,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

import { Credentials, User } from '../models/user';
import { SignUpForm } from '../models/form';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userPool = new CognitoUserPool({
    ClientId: environment.amplify.Auth.userPoolWebClientId,
    UserPoolId: environment.amplify.Auth.userPoolId,
  });
  constructor(private location: Location) {
    Auth.configure(environment.amplify.Auth);
  }

  login({ email, password }: Credentials): Observable<User> {
    return new Observable(subscriber => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
      });
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
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
        onSuccess: function(result) {
          subscriber.next(result.getIdToken().decodePayload() as User);
        },
        onFailure: function(err) {
          subscriber.error(err);
        },
      });
    });
  }

  logout() {
    return from(
      Auth.signOut().then(e => {
        const userId = Cookie.get(
          `CognitoIdentityServiceProvider.${
            environment.amplify.Auth.userPoolWebClientId
          }.LastAuthUser`,
        );
        Cookie.remove(
          `CognitoIdentityServiceProvider.${
            environment.amplify.Auth.userPoolWebClientId
          }.${userId}.idToken`,
        );
        Cookie.remove(
          `CognitoIdentityServiceProvider.${
            environment.amplify.Auth.userPoolWebClientId
          }.${userId}.accessToken`,
        );
        Cookie.remove(
          `CognitoIdentityServiceProvider.${
            environment.amplify.Auth.userPoolWebClientId
          }.${userId}.clockDrift`,
        );
        Cookie.remove(
          `CognitoIdentityServiceProvider.${
            environment.amplify.Auth.userPoolWebClientId
          }.${userId}.refreshToken`,
        );
        Cookie.remove(
          `CognitoIdentityServiceProvider.${
            environment.amplify.Auth.userPoolWebClientId
          }.LastAuthUser`,
        );
        return e;
      }),
    );
  }

  signUp(form: SignUpForm) {
    const attributeList = [];

    const attributeName = new CognitoUserAttribute({
      Name: 'name',
      Value: form.name,
    });

    attributeList.push(attributeName);
    return from(
      Auth.signUp({
        username: form.email,
        password: form.password,
        attributes: {
          email: form.email,
          name: form.name,
        },
      }),
    );
  }
}
