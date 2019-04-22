import { Component, OnInit, Input } from '@angular/core';
import { faShoppingCart, faStore } from '@fortawesome/free-solid-svg-icons';
import { ProductsSC } from 'src/app/services/products.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  faShoppingCart = faShoppingCart;
  faStore = faStore;
  totalProducts: number;

  constructor(private productsSC: ProductsSC) {
  }

  ngDoCheck(): void {
    // Uaktualnienie summy total za wszystkie produkty w koszyku.
    this.totalProducts = this.productsSC.productsInSC.length;
  }

  ngOnInit() {
    // Sprawdzam, czy jest coś w LocalStorage -> jeżeli jest - dodaję do koszyka.
    if (localStorage.length > 0 && this.productsSC.productsInSC.length === 0) {
      JSON.parse(localStorage.getItem('shoppingCart')).forEach(element => {
        this.productsSC.productsInSC.push(element);
      });
    }
  }
}
