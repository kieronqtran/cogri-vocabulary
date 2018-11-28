import { SignUpForm } from '../models/form';
import { formReducer, initialState } from './sign-up-page.reducer';
import { ActionFormUpdate, ActionFormReset } from '../actions/form.actions';

describe('FormReducer', () => {
  const form: SignUpForm = {
    username: 'test',
    password: 'test',
    email: 'test@test.test',
    description: 'It is a test.',
    birthday: new Date(),
    rating: 10,
  };

  it('should return the default state', () => {
    const action = {} as any;
    const state = formReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should update the form', () => {
    const action = new ActionFormUpdate({
      form: { ...form, username: 'updated' },
    });
    const state = formReducer(initialState, action);
    expect(state.signUp.username).toBe('updated');
  });

  it('should reset the form', () => {
    const action = new ActionFormReset();
    const state = formReducer(undefined, action);
    expect(state).toEqual(initialState);
  });
});
