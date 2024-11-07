import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SaleActions } from './store/sale.actions';
import { Observable } from 'rxjs';
import { Sale } from './models';
import {
  selectIsLoadinSales,
  selectLoadSalesError,
  selectProductOptions,
  selectSales,
  selectUserOptions,
} from './store/sale.selectors';
import { Product } from '../products/models';
import { User } from '../users/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent implements OnInit {
  sales$: Observable<Sale[]>;
  userOptions$: Observable<User[]>;
  productOptions$: Observable<Product[]>;
  loadSalesError$: Observable<Error | null>;
  isLoadingSales$: Observable<boolean>;

  saleForm: FormGroup;

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.saleForm = this.formBuilder.group({
      productId: [null, [Validators.required]],
      userId: [null, [Validators.required]],
    });

    this.sales$ = this.store.select(selectSales);
    this.productOptions$ = this.store.select(selectProductOptions);
    this.userOptions$ = this.store.select(selectUserOptions);
    this.isLoadingSales$ = this.store.select(selectIsLoadinSales);
    this.loadSalesError$ = this.store.select(selectLoadSalesError);
  }

  ngOnInit(): void {
    this.store.dispatch(SaleActions.loadSales());
    this.store.dispatch(SaleActions.loadProductOptions());
    this.store.dispatch(SaleActions.loadUserOptions());
  }

  onSubmit(): void {
    if (this.saleForm.invalid) {
      this.saleForm.markAllAsTouched();
    } else {
      this.store.dispatch(SaleActions.createSale(this.saleForm.value));
      this.saleForm.reset();
    }
  }
}
