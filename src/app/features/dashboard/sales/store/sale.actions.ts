import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Sale } from '../models';
import { User } from '../../users/models';
import { Product } from '../../products/models';

export const SaleActions = createActionGroup({
  source: 'Sale',
  events: {
    // Quiero cargar las ventas...
    'Load Sales': emptyProps(),

    // El servidor respondio ok con las ventas...
    'Load Sales Success': props<{ data: Sale[] }>(),

    // El servidor responde con un error
    'Load Sales Failure': props<{ error: Error }>(),

    // Quiero crear una venta...
    'Create Sale': props<{ productId: string; userId: string }>(),
    'Create Sale Success': props<{ data: Sale }>(),
    'Create Sale Failure': props<{ error: Error }>(),

    'Load Products And User Options': emptyProps(),
    'Load Products And User Options Success': props<{
      users: User[];
      products: Product[];
    }>(),
    'Load Products And User Options Failure': props<{ error: Error }>(),

    // 'Load Product Options': emptyProps(),
    // 'Load User Options': emptyProps(),
    // 'Load Product Options Success': emptyProps(),
    // 'Load User Options Success': emptyProps(),
  },
});
