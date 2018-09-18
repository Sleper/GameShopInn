import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import {RouterModule, Routes} from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


const appRoutes: Routes = [
  {path: 'product-list', component: ProductListComponent},
  {path: 'order-list', component: OrderListComponent},
  {path: '', redirectTo: '/product-list', pathMatch: 'full'},
  {path: '**', component: ProductListComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
