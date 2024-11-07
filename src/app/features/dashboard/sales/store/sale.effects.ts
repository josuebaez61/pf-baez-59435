import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, delay, map } from 'rxjs/operators';
import { Observable, EMPTY, of, pipe, forkJoin } from 'rxjs';
import { SaleActions } from './sale.actions';
import { SalesService } from '../../../../core/services/sales.service';
import { AuthActions } from '../../../../store/actions/auth.actions';
import { Action } from '@ngrx/store';
import { UsersService } from '../../../../core/services/users.service';
import { ProductsService } from '../../../../core/services/products.service';

@Injectable()
export class SaleEffects {
  // loadSales$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(SaleActions.loadSales),
  //     /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //     concatMap(() => EMPTY as Observable<{ type: string }>)
  //   );
  // });

  loadSales$: Actions<Action<string>>;
  createSale$: Actions<Action<string>>;
  createSaleSuccess$: Actions<Action<string>>;

  loadProductsAndUserOptions$: Actions<Action<string>>;

  constructor(
    private actions$: Actions,
    private salesService: SalesService,
    private userService: UsersService,
    private productsService: ProductsService
  ) {
    this.loadSales$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SaleActions.loadSales),
        // delay(5000),
        concatMap(() =>
          this.salesService.getSales().pipe(
            // Respuesta satisfactoria
            map((response) => SaleActions.loadSalesSuccess({ data: response })),
            // Respuesta erronea
            catchError((error) => of(SaleActions.loadSalesFailure({ error })))
          )
        )
      );
    });

    this.createSale$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SaleActions.createSale),
        concatMap((action) =>
          this.salesService
            .createSale({
              productId: action.productId,
              userId: action.userId,
            })
            .pipe(
              map((data) => SaleActions.createSaleSuccess({ data })),
              catchError((error) =>
                of(SaleActions.createSaleFailure({ error }))
              )
            )
        )
      );
    });

    this.createSaleSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SaleActions.createSaleSuccess),
        map(() => SaleActions.loadSales())
      );
    });

    this.loadProductsAndUserOptions$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SaleActions.loadProductsAndUserOptions),
        concatMap(() =>
          forkJoin([
            this.productsService.getProducts(),
            this.userService.getUsers(),
          ]).pipe(
            map((res) =>
              SaleActions.loadProductsAndUserOptionsSuccess({
                products: res[0],
                users: res[1],
              })
            ),
            catchError((error) =>
              of(SaleActions.loadProductsAndUserOptionsFailure({ error }))
            )
          )
        )
      );
    });
  }
}
