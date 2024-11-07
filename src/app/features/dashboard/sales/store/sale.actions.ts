import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Sale } from '../models';

export const SaleActions = createActionGroup({
  source: 'Sale',
  events: {
    // Quiero cargar las ventas...
    'Load Sales': emptyProps(),

    // El servidor respondio ok con las ventas...
    'Load Sales Success': props<{ data: Sale[] }>(),

    // El servidor responde con un error
    'Load Sales Failure': props<{ error: Error }>(),

    'Load Product Options': emptyProps(),
    'Load User Options': emptyProps(),
    'Load Product Options Success': emptyProps(),
    'Load User Options Success': emptyProps(),

    'Create Sale': props<{ productId: string; userId: string }>(),
  },
});
