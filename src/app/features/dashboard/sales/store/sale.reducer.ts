import { createFeature, createReducer, on } from '@ngrx/store';
import { SaleActions } from './sale.actions';
import { Sale } from '../models';
import { Product } from '../../products/models';
import { User } from '../../users/models';
import { generateRandomString } from '../../../../shared/utils';

export const saleFeatureKey = 'sale';

const PRODUCTS_DB: Product[] = [
  {
    id: 'avcE2',
    name: 'PS5',
    price: 9999,
    categoryId: 'asdasd',
  },
  {
    id: 'avcdE32',
    name: 'Heladera',
    price: 9999,
    categoryId: 'asdasd',
  },
];

const USER_DB: User[] = [
  {
    id: '4d22',
    firstName: 'Josue',
    lastName: 'Baez',
    email: 'jbaez@mail.com',
    password: '123456',
    role: 'ADMIN',
    token: 'ndsHSBnsdjkasJs354MSjsnmvcs332SJnxjS',
    createdAt: new Date('2024-10-24T00:14:33.140Z'),
  },
  {
    id: 'Fr24',
    firstName: 'Naruto',
    lastName: 'Uzumaki',
    email: 'naru@mail.com',
    createdAt: new Date('2024-10-24T01:28:09.184Z'),
    role: 'USER',
    password: 'LHxfNUFt',
    token: 'FKejj6VrYmRw2EtEuecO',
  },
];

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

  on(SaleActions.loadProductOptions, (state) => {
    return {
      ...state,
      productOptions: [...PRODUCTS_DB],
    };
  }),
  on(SaleActions.loadUserOptions, (state) => {
    return {
      ...state,
      userOptions: [...USER_DB],
    };
  }),
  on(SaleActions.createSale, (state, action) => {
    return {
      ...state,
      sales: [
        ...state.sales,
        {
          id: generateRandomString(4),
          productId: action.productId,
          userId: action.userId,
        },
      ],
    };
  })
);

export const saleFeature = createFeature({
  name: saleFeatureKey,
  reducer,
});
