import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const SaleActions = createActionGroup({
  source: 'Sale',
  events: {
    'Load Sales': emptyProps(),
    'Load Product Options': emptyProps(),
    'Load User Options': emptyProps(),
  },
});
