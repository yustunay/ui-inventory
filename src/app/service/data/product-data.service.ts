import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/list-products/list-products.component';
import { PRODUCT_API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private http:HttpClient) { }

  retrieveAllProducts() {
    return this.http.get<Product[]>(`${PRODUCT_API_URL}`);
  }
}
