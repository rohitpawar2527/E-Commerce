import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Productservice } from '../services/product.service';
import { cart, pricesummary } from '../interface/signup';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-cart.html',
  styleUrl: './my-cart.css',
})
export class MyCart implements OnInit {
  cartdata: cart[] | undefined;
  pricesummary: pricesummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  private platformId = inject(PLATFORM_ID)
  constructor(private product: Productservice, private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.loadDetails();
  }
  removeToCart(cartId: number | string) {
    this.cartdata && this.product.removetocart(cartId).subscribe((result) => {
      this.loadDetails();
    })
  }
  loadDetails() {
    if (isPlatformBrowser(this.platformId)) {
      this.product.currentcart().subscribe((result) => {
        console.log('cart data recieved', result);
        this.cartdata = result;
        let price = 0;
        result.forEach((item) => {
          if (item.quantity) {
            price = price + ((item.price) * item.quantity)
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
        this.cd.markForCheck();
        setTimeout(() => { this.cd.detectChanges() }, 0)
      })
    }
  }
}
