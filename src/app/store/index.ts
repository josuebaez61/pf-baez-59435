import { ActionReducerMap } from '@ngrx/store';
import {
  counterFeatureName,
  counterReducer,
  CounterState,
} from './reducers/counter.reducer';
import {
  authFeatureName,
  authReducer,
  AuthState,
} from './reducers/auth.reducer';

interface RootState {
  [counterFeatureName]: CounterState;
  [authFeatureName]: AuthState;
}

const RootReducer: ActionReducerMap<RootState> = {
  [counterFeatureName]: counterReducer,
  [authFeatureName]: authReducer,
};

export { RootReducer };
