import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShCartComponent } from './sh-cart/sh-cart.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './products/categories/categories.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { ScListComponent } from './sh-cart/sc-list/sc-list.component';
import { ProductsSC } from './services/products.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ShCartComponent,
    ProductsComponent,
    CategoriesComponent,
    ProductsListComponent,
    ScListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, HttpService, ProductsSC],
  bootstrap: [AppComponent]
})
export class AppModule { }
