import { ActionReducerMap } from '@ngrx/store';
import {
  counterFeatureName,
  counterReducer,
  CounterState,
} from './reducers/counter.reducer';

interface RootState {
  [counterFeatureName]: CounterState;
}

const RootReducer: ActionReducerMap<RootState> = {
  [counterFeatureName]: counterReducer,
};

export { RootReducer };
