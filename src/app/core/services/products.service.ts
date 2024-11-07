import { Injectable } from '@angular/core';
import { Product } from '../../features/dashboard/products/models';
import { generateRandomString } from '../../shared/utils';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export let MY_DATABASE: Product[] = [
  {
    id: generateRandomString(4),
    name: 'PC Gamer',
    price: 9999,
    categoryId: 'fSDv3d',
  },
  {
    id: generateRandomString(4),
    name: 'PS5',
    price: 9999,
    categoryId: 'VCSsd3',
  },
];

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.apiBaseURL}/products`);
    // return of([...MY_DATABASE]);
  }

  deleteById(id: string): Observable<Product[]> {
    MY_DATABASE = MY_DATABASE.filter((p) => p.id !== id);
    return this.getProducts();
  }

  createProduct(data: Omit<Product, 'id'>): Observable<Product[]> {
    MY_DATABASE.push({ ...data, id: generateRandomString(4) });
    return this.getProducts();
  }
}
