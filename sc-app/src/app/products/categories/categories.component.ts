import { Component, OnInit } from '@angular/core';
import { faDesktop, faLaptop, faKeyboard, faTv, faBars } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

  faDesktop = faDesktop;
  faLaptop = faLaptop;
  faKeyboard = faKeyboard;
  faTv = faTv;
  faBars = faBars;
  notActive = true;
  active = true;

  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  categoryActive(event: any) {
    const allElements = event.srcElement.parentElement.children;
    const productsCollection = document.getElementsByClassName('products-list__item');

    // Usuwam nie aktywny element w kategorii.
    for (let i = 0; i < allElements.length; i++) {
      if (allElements[i].classList.contains('categories-list__item-active')) {
        allElements[i].classList.remove('categories-list__item-active');
      }
    }

    // Dodaję klasę ACTIVE dla odpowiednie kategorii.
    event.srcElement.classList.add('categories-list__item-active');

    // Najpierw usuwam klass ACTIVE dla aktywnych produktów.
    for (let i = 0; i < productsCollection.length; i++) {
      if (productsCollection[i].classList.contains('products-list__item-active')) {
        productsCollection[i].classList.remove('products-list__item-active');
      }
    }

    // Dodaje klas ACTIVE dla wszystkich produktów (Wybrana kategoria All Categories).
    if (event.srcElement.textContent.trim() === 'All Categories') {
      for (let i = 0; i < productsCollection.length; i++) {
        productsCollection[i].classList.add('products-list__item-active');
      }
    } else { // Dodaję klas ACTIVE dla produktów zaznaczonych w kategoriach.
      for (let i = 0; i < productsCollection.length; i++) {
        if (productsCollection[i].classList.contains(event.srcElement.classList[1])) {
          productsCollection[i].classList.add('products-list__item-active');
        }
      }
    }
  }

}
