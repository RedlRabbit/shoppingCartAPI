import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'src/app/services/http.service';
import { ProductsSC } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.sass']
})
export class ProductsListComponent implements OnInit {

  faShoppingCart = faShoppingCart;
  productsList: Array<Product> = [];

  constructor(private httpService: HttpService, private productsSC: ProductsSC) { }

  ngOnInit() {
    // Zapis obserwowanych danych do Listy.
    this.httpService.getProducts().subscribe(productsInwedo => {
      productsInwedo.forEach(product => {
        this.productsList.push(product);
        this.productsList.forEach(element => {
          element.quantity = 0;
          // Dadanie typu dla każdego produktu. (Pobieranie produkty ze strony nie posiadają typu).
          if (element.name.includes('Monitor')) {
            element.type = "monitor"
          }
          if (element.name.includes('Laptop')) {
            element.type = "laptop"
          }
          if (element.name.includes('Klawiatura')) {
            element.type = "keyboard"
          }
          if (element.name.includes('Komputer')) {
            element.type = "komputer"
          }
        });
      });
    });
  }

  ngDoCheck(): void {
    // Licznik pozostałych produktów w sklepie ( Nie ma możliwości uaktualnić ilość po stronie serwera ).
    this.productsSC.productsInSC.forEach(element => {
      if (this.productsList[this.productsList.findIndex(x => x.id == element.id)]) {
        this.productsList[this.productsList.findIndex(x => x.id == element.id)].availableAmount = element.availableAmount;
      }
    });
  }

  addToCart(event) {
    let parentId = event.srcElement.parentElement.id;

    // Sprawdzam czy są produkty w sklepie.
    if (this.productsList[this.productsList.findIndex(x => x.id == parentId)].availableAmount != 0) {

      // Jeśli koszyk pusty ( nie pobrano wartości z LocalStorage) -> dodaje produkt do koszyka.
      if (this.productsSC.productsInSC.length === 0) {
        this.productsSC.productsInSC.push(this.productsList[parentId - 1]);
        this.productsSC.productsInSC[this.productsSC.productsInSC.findIndex(x => x.id == parentId)].quantity++;
      } else { // Jeśli koszyk nie jest pusty -> szukam tego samego produktu, żeby zwiększyć ilość, albo dodaje nowy.
        let itemAdded = false;
        this.productsSC.productsInSC.forEach(element => {
          if (element.id == parentId) {
            this.productsSC.productsInSC[this.productsSC.productsInSC.findIndex(x => x.id == parentId)].quantity++;
            itemAdded = true;
          }
        });
        if (itemAdded === false) {
          this.productsSC.productsInSC.push(this.productsList[parentId - 1]);
          this.productsSC.productsInSC[this.productsSC.productsInSC.findIndex(x => x.id == parentId)].quantity++;
        }
      }

      this.productsSC.productsInSC[this.productsSC.productsInSC.findIndex(x => x.id == parentId)].availableAmount--;
      // Dodanie lokalnego koszyka do localStorage.
      localStorage.setItem('shoppingCart', JSON.stringify(this.productsSC.productsInSC));
    }
  }

}

export interface Product {
  id?: number;
  description?: string;
  imgUrl?: string;
  name?: string;
  availableAmount?: number;
  price?: number;
  quantity?: number; // Licznik produktów.
  type?: string; // Typ produktu.
}
