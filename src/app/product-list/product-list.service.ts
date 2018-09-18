import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductList } from './product-list.interface';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProductListService {

  private productUrl = 'http://localhost:3000/products';
  private orderUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }


  getProducts(productId?): Observable<IProductList[]> {
    if(productId){
      return this.http.get<IProductList[]>(this.productUrl, {
        params: {
          id: productId
        }
      });
    }
    return this.http.get<IProductList[]>(this.productUrl)
    
  }

  getProduct(productId): Observable<IProductList> {
    return this.http.get<IProductList>(this.productUrl, {
      params: {
        id: productId
      }
    });
  }

  createOrder(product): Observable<IProductList> {
    return this.http.post<IProductList>(this.orderUrl, product);
  }

}
