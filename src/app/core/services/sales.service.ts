import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../../features/dashboard/sales/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SalesService {
  constructor(private httpClient: HttpClient) {}

  getSales(): Observable<Sale[]> {
    return this.httpClient.get<Sale[]>(
      `${environment.apiBaseURL}/sales?_embed=user&_embed=product`
    );
  }

  createSale(payload: Omit<Sale, 'id' | 'user' | 'product'>): Observable<Sale> {
    return this.httpClient.post<Sale>(
      `${environment.apiBaseURL}/sales`,
      payload
    );
  }
}
