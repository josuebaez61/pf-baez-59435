import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { User } from '../../features/dashboard/users/models';

// export const setAuthenticatedUser = createAction(
//   '[Auth] Set Authenticated User',
//   props<{ user: User }>()
// );

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Set Authenticated User': props<{ user: User }>(),
    'Unset Authenticated User': emptyProps(),
  },
});
