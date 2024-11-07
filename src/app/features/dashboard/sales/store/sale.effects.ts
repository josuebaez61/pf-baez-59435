import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, delay, map } from 'rxjs/operators';
import { Observable, EMPTY, of, pipe } from 'rxjs';
import { SaleActions } from './sale.actions';
import { SalesService } from '../../../../core/services/sales.service';
import { AuthActions } from '../../../../store/actions/auth.actions';
import { Action } from '@ngrx/store';

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

  // loadUsersAndProducsSuccess$: Actions<Action<string>>;

  constructor(private actions$: Actions, private salesService: SalesService) {
    // const obs1 = of(1, 2, 3, 4, 5);
    // const obs2 = of(6, 7, 8, 9, 10);
    // obs1
    //   .pipe(
    //     concatMap((emisionDelObs1) =>
    //       obs2.pipe(map((emisionDelObs2) => [emisionDelObs1, emisionDelObs2]))
    //     )
    //   )
    //   .subscribe(console.log);
    // const obtenerIdUsuario = of(343);
    // const obtenerUsuarioPorId = of({ id: 343, nombre: 'pepito' });
    // obtenerIdUsuario.pipe(concatMap((id) => obtenerUsuarioPorId)).subscribe({
    //   next: (usuario) => console.log(usuario),
    // });

    // this.loadUsersAndProducsSuccess$ = createEffect(() => {
    //   return this.actions$.pipe(
    //     ofType(
    //       SaleActions.loadProductOptionsSuccess,
    //       SaleActions.loadUserOptionsSuccess
    //     ),
    //     pipe(() => {

    //     })
    //   );
    // });

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
  }
}
