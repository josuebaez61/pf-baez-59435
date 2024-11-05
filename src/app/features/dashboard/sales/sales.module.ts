import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { EffectsModule } from '@ngrx/effects';
import { SaleEffects } from './store/sale.effects';
import { StoreModule } from '@ngrx/store';
import { saleFeature } from './store/sale.reducer';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [SalesComponent],
  imports: [
    CommonModule,
    SharedModule,
    SalesRoutingModule,
    StoreModule.forFeature(saleFeature),
    EffectsModule.forFeature([SaleEffects]),
  ],
})
export class SalesModule {}
