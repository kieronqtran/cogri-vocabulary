import { AuthApiActions, AuthActions, LoginPageActions } from '../actions';
import { User } from '../models/user';
import * as Cookie from 'js-cookie';
import { environment } from '@env/environment';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: loadInitialState(),
};

function loadInitialState(): any {
  const userId = Cookie.get(
    `CognitoIdentityServiceProvider.${
      environment.amplify.Auth.userPoolWebClientId
    }.LastAuthUser`,
  );
  const token = Cookie.get(
    `CognitoIdentityServiceProvider.${
      environment.amplify.Auth.userPoolWebClientId
    }.${userId}.idToken`,
  );
  if (!token) {
    return null;
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload;
}

export function reducer(
  state = initialState,
  action:
    | AuthApiActions.AuthApiActionsUnion
    | AuthActions.AuthActionsUnion
    | LoginPageActions.LoginPageActionsUnion,
): State {
  switch (action.type) {
    case LoginPageActions.LoginPageActionTypes.LoginCallback: {
      const user = JSON.parse(atob(action.payload.id_token.split('.')[1]));
      return {
        ...state,
        user: user,
      };
    }

    case AuthApiActions.AuthApiActionTypes.LoginSuccess: {
      return {
        ...state,
        user: action.payload.user,
      };
    }

    case AuthActions.AuthActionTypes.Logout: {
      return { user: null };
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state: State) => state.user;
