import { createFeature, createReducer, on } from '@ngrx/store';
import { SaleActions } from './sale.actions';
import { Sale } from '../models';
import { Product } from '../../products/models';
import { User } from '../../users/models';

export const saleFeatureKey = 'sale';

export interface State {
  isLoadingSales: boolean;
  loadSalesError: Error | null;
  sales: Sale[];
  productOptions: Product[];
  userOptions: User[];
}

export const initialState: State = {
  isLoadingSales: false,
  loadSalesError: null,
  sales: [],
  productOptions: [],
  userOptions: [],
};

export const reducer = createReducer(
  initialState,
  on(SaleActions.createSale, (state) => {
    return {
      ...state,
      isLoadingSales: true,
    };
  }),
  on(SaleActions.loadSales, (state) => {
    return {
      ...state,
      isLoadingSales: true,
    };
  }),
  on(SaleActions.loadSalesSuccess, (state, action) => {
    return {
      ...state,
      sales: action.data,
      loadSalesError: null,
      isLoadingSales: false,
    };
  }),
  on(SaleActions.loadSalesFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      loadSalesError: action.error,
      isLoadingSales: false,
    };
  }),

  on(SaleActions.loadProductsAndUserOptions, (state) => {
    return {
      ...state,
      isLoadingSales: true,
    };
  }),
  on(SaleActions.loadProductsAndUserOptionsSuccess, (state, action) => {
    return {
      ...state,
      loadSalesError: null,
      isLoadingSales: false,
      productOptions: action.products,
      userOptions: action.users,
    };
  }),
  on(SaleActions.loadProductsAndUserOptionsFailure, (state, { error }) => {
    return {
      ...state,
      loadSalesError: error,
      isLoadingSales: false,
    };
  })
);

export const saleFeature = createFeature({
  name: saleFeatureKey,
  reducer,
});
