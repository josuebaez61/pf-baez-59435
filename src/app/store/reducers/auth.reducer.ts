import { createReducer, on } from '@ngrx/store';
import { User } from '../../features/dashboard/users/models';
import { AuthActions } from '../actions/auth.actions';

export const authFeatureName = 'auth';

export interface AuthState {
  authenticatedUser: User | null;
}

const initialState: AuthState = {
  authenticatedUser: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setAuthenticatedUser, (state, action) => {
    return {
      ...state,
      authenticatedUser: action.user,
    };
  }),
  on(AuthActions.unsetAuthenticatedUser, (state) => {
    return {
      ...state,
      authenticatedUser: null,
    };
  })
);
