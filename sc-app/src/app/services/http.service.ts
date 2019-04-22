import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../products/products-list/products-list.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // Pobieranie wszystkich produktow.
  getProducts(): Observable<Array<Product>> {

    // Lokalnie działa.
    //return this.http.get<Array<Product>>('http://shoppingcartapi.hire.inwedo.com/items');

    // Pobieram z plki, ponieważ nie da się pobrać z API w związku z ograniczeniem CORS.
    return this.http.get<Array<Product>>('assets/products.json');
  }
}
