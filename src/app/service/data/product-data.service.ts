import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/list-products/list-products.component';
import { Constants } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(
               private http:HttpClient
              ) { }

  retrieveAllProducts() {
    return this.http.get<Product[]>(`${Constants.PRODUCT_API_URL}`);
  }

  retrieveProduct(id:number) {
    return this.http.get<Product>(`${Constants.PRODUCT_API_URL}/product/${id}`);
  }

  updateProduct(id, product) {
    return this.http.put(`${Constants.PRODUCT_API_URL}/product/${id}`,product)
  }

  createProduct(product) {
    return this.http.post(`${Constants.PRODUCT_API_URL}/product/`,product)
  }

}
