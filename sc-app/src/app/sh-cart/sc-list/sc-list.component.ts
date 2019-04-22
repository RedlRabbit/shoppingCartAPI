import { Component, OnInit } from '@angular/core';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { ProductsSC } from 'src/app/services/products.service';
import { Product } from 'src/app/products/products-list/products-list.component';
import { Observable } from 'rxjs';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-sc-list',
  templateUrl: './sc-list.component.html',
  styleUrls: ['./sc-list.component.sass']
})
export class ScListComponent implements OnInit {

  faTruck = faTruck;

  productsInSC: Array<Product> = JSON.parse(localStorage.getItem('shoppingCart'));
  totalPrice: any = 0;

  constructor(private productsSC: ProductsSC) {

  }

  ngOnInit() {

  }

  ngDoCheck(): void {
    this.productsInSC = JSON.parse(localStorage.getItem('shoppingCart'));
    this.totalPrice = 0;
    this.productsInSC.forEach(element => {
      this.totalPrice += (element.price * element.quantity);
    });
  }

  productQuantityUp(event) {
    // Szukam nazwę produktu, przy odpwiednim przycisku.
    const productName = event.srcElement.parentElement.parentElement.children[1].textContent.trim();
    // Zwiększam ilość w koszyku.
    this.productsInSC[this.productsInSC.findIndex(x => x.name === productName)].quantity++;

    localStorage.setItem('shoppingCart', JSON.stringify(this.productsInSC));
  }

  productQuantityDown(event) {
    // Szukam nazwę produktu, przy odpwiednim przycisku.
    const productName = event.srcElement.parentElement.parentElement.children[1].textContent.trim();

    if (this.productsInSC[this.productsInSC.findIndex(x => x.name === productName)].quantity === 1) {
      this.productsSC.productsInSC.splice(this.productsInSC.findIndex(x => x.name === productName), 1);
    } else {
      this.productsSC.productsInSC[this.productsInSC.findIndex(x => x.name === productName)].quantity--;
    }

    localStorage.setItem('shoppingCart', JSON.stringify(this.productsSC.productsInSC));
  }

  clearShoppingCart() {
    this.productsSC.productsInSC.length = 0;
    localStorage.setItem('shoppingCart', JSON.stringify(this.productsSC.productsInSC));
  }

}
