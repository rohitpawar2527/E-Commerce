import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Productservice } from '../services/product.service';
import { Router, RouterLink } from '@angular/router';
import { cart, order, orderData, pricesummary } from '../interface/signup';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  @ViewChild('checkoutForm') checkoutForm!:NgForm;
  cartData:cart[] | undefined;
  ordermessage:string|undefined;
  pricesummary: pricesummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private product = inject(Productservice);
  constructor() { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.product.currentcart().subscribe((result) => {
        let price = 0;
        this.cartData=result;
        result.forEach((item) => {
          if (item.quantity) {
            price = price + (+item.price * +item.quantity)
          }
          console.log(price)
        })
        this.pricesummary.price = price;
        this.pricesummary.discount = Math.round(price * 0.1);
        this.pricesummary.tax = Math.round(price * 0.18);
        this.pricesummary.delivery = price > 500 ? 0 : 50;

        this.pricesummary.total =
          this.pricesummary.price -
          this.pricesummary.discount +
          this.pricesummary.delivery +
          this.pricesummary.tax;


        console.log('hello', this.pricesummary);

        this.cdr.detectChanges();


      })
    }
  }
  orderNow(data: orderData) {
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user).id
    if(this.pricesummary.total){
      let orderdata:order={
        ...data,
        totalPrice:this.pricesummary.total,
        userId,
        id:undefined
      }

      this.cartData?.forEach((item)=>{
        setTimeout(()=>{
          this.product.deletecartItems(item.id)
        },800);
      })

      this.product.orderNow(orderdata).subscribe((result)=>{
        if(result){
          this.ordermessage="Your order has been placed";
        setTimeout(()=>{
          this.router.navigate(['/my-orders']) 
          this.ordermessage=undefined
        },4000);
        }
      })
    }
    
  }

}
