import { createFeature, createReducer, on } from '@ngrx/store';
import { SaleActions } from './sale.actions';
import { Sale } from '../models';
import { Product } from '../../products/models';
import { User } from '../../users/models';

export const saleFeatureKey = 'sale';

const SALES_DB: Sale[] = [
  {
    id: 'sdUd24',
    productId: 'asds',
    userId: 'adasds',
  },
  {
    id: 'fdfds',
    productId: 'vfgfdg',
    userId: 'sdasdasd',
  },
];

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
  sales: Sale[];
  productOptions: Product[];
  userOptions: User[];
}

export const initialState: State = {
  sales: [],
  productOptions: [],
  userOptions: [],
};

export const reducer = createReducer(
  initialState,
  on(SaleActions.loadSales, (state) => {
    return {
      ...state,
      sales: [...SALES_DB],
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
  })
);

export const saleFeature = createFeature({
  name: saleFeatureKey,
  reducer,
});
