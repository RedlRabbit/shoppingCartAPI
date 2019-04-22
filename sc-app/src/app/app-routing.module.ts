import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShCartComponent } from './sh-cart/sh-cart.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: 'shopping-cart', component: ShCartComponent},
  { path: '', redirectTo: 'products', pathMatch:'full'},
  { path: 'products', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
