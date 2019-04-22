import { Injectable } from '@angular/core';
import { Product } from '../products/products-list/products-list.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsSC {

  productsInSC: Array<Product> = [];

  constructor() { }


}
