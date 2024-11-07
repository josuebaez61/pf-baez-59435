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
}
