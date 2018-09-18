import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrderList } from '../product-list/product-list.interface';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class OrderListService {

  private orderUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  getOrders(productId?): Observable<IOrderList[]> {
    if(productId){
      return this.http.get<IOrderList[]>(this.orderUrl, {
        params: {
          id: productId
        }
      });
    }
    return this.http.get<IOrderList[]>(this.orderUrl)
    
  }

  deleteOrder(orderId): Observable<IOrderList>{
    return this.http.delete<IOrderList>(`${this.orderUrl}/${orderId}`, httpOptions);
  }
}
