import { SignUpForm } from '../models/form';
import { reducer, initialState } from './sign-up-page.reducer';
import {
  SignUpFormReset,
  SignUpFormUpdate,
} from '../actions/sign-up-page.actions';

describe('FormReducer', () => {
  const form: SignUpForm = {
    email: 'test@test.test',
    password: 'test',
    name: 'Annnora Smeeton',
  };

  it('should return the default state', () => {
    const action = {} as any;
    const state = reducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should update the form', () => {
    const action = new SignUpFormUpdate({
      form: { ...form },
    });
    const state = reducer(initialState, action);
    expect(state.signUp.email).toBe('test@test.test');
  });

  it('should reset the form', () => {
    const action = new SignUpFormReset();
    const state = reducer(undefined, action);
    expect(state).toEqual(initialState);
  });
});
