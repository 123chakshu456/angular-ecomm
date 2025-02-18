import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  orderData: order[] | undefined;
  
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        this.orderData = this.orderData?.filter((item)=>{
          return item.id !== orderId;
        })
      }
    })
  }

  getOrderList(){
    this.product.orderList().subscribe((result: any)=>{
      this.orderData = result;
    })
  }

}
