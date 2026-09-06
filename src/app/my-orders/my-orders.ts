import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Productservice } from '../services/product.service';
import { order } from '../interface/signup';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders implements OnInit {
  orderData: order[] | undefined;
  constructor(private product: Productservice, private cdr:ChangeDetectorRef) { }
  ngOnInit(): void {
    this.getorderlist();
  }
  cancelorder(orderId:number|undefined){
    console.log('the is orderid',orderId);
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      this.getorderlist();
      
    })
  }
  getorderlist(){
    this.product.orderlist().subscribe((result) => {
      console.log(result);
      this.orderData = result;
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    })
  }
}
