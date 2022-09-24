import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from 'src/environments/environment';
import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  apiUrl = url;
  constructor(private readonly http: HttpClient) { }

  getProductList(product: any) {
    return this.http.post(`${this.apiUrl}/product/list`, product);
  }

  getProductById(id: any) {
    return this.http.get(`${this.apiUrl}/product/get/${id}`);
  }

  addProduct(product: Product) {
    return this.http.post(`${this.apiUrl}/product/create`, product);
  }

  editProduct(product: Product, id: any) {
    return this.http.put(`${this.apiUrl}/product/update/${id}`, product);
  }

  deleteProduct(id : any) {
    return this.http.delete(`${this.apiUrl}/product/delete/${id}`);
  }
}
