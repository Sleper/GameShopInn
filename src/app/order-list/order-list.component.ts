import { Component, OnInit } from '@angular/core';
import { IOrderList } from '../product-list/product-list.interface';
import { OrderListService } from './order-list.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: IOrderList[];
  keyword: any;

  timeout = null;

  constructor(private orderListService: OrderListService) { }

  ngOnInit() {
    this.assignOrders();
  }

  assignOrders(query?){
    if(query){
      return this.orderListService.getOrders(query)
        .subscribe( ordersReceived => this.orders = ordersReceived);
    }
    this.orderListService.getOrders()
      .subscribe( ordersReceived => this.orders = ordersReceived);
  }


  searchListener(event){
    console.log(event.target.value);
    this.keyword = event.target.value;
    clearTimeout(this.timeout);
    this.timeout = setTimeout( () => {
      if(!this.keyword){
        return this.assignOrders();
      }
      this.assignOrders();
      let filledArray = [];
      this.orders.forEach(order => {
        let result = order.name.toLowerCase().includes(this.keyword.toLowerCase());
        if(result) {
          filledArray.push(order.id)
        }
      })
      console.log(filledArray);
      this.assignOrders(filledArray);
    }, 300);
  }

  cancelOrder(event){
    console.log(event.target.id);
    let id = +(event.target.id);
    this.orderListService.deleteOrder(id)
    .subscribe( () => this.orders = this.orders.filter(order => order.id !== id));
  }

}
