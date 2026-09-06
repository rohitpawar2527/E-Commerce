import { ChangeDetectorRef, Component, inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Productservice } from '../services/product.service';
import { cart, product } from '../interface/signup';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  productData: undefined | product;
  productQuantity = 1;
  removecart = false;
  cartdata:product | undefined;
  private platformId = inject(PLATFORM_ID);
  constructor(private route: ActivatedRoute, private product: Productservice, private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let productId = params.get('productId')
      console.log(productId);
      if (productId) {
        this.product.getProduct(productId).subscribe((result) => {
          this.productData = result;
          if (isPlatformBrowser(this.platformId)) {
            let cartData = localStorage.getItem('localcart');
            if (productId && cartData) {
              let items = JSON.parse(cartData)
              items = items.filter((item: product) => String(productId) == String(item.id))
              if (items.length) {
                this.removecart = true;
              }
              else {
                this.removecart = false;
              }
            }
            let user = localStorage.getItem('user')
            if (user) {
              let userId = user && JSON.parse(user).id
              this.product.getCartList(userId)
              this.product.cartData.subscribe((result) => {
                let item = result.filter((item: product) => String(productId) == String(item.productId))
                if (item.length) {
                  this.cartdata=item[0]
                  this.removecart = true
                  this.cd.detectChanges();
                }
              })
            }

          }
          this.cd.detectChanges();
        })
      }
    })
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    }
    else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity
      if (!localStorage.getItem('user')) {
        this.product.LocalAddtoCart(this.productData);
        this.removecart = true;
        this.cd.detectChanges();
      }
      else {
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        const { id, ...restproduct } = this.productData
        let cartData: cart = {
          ...restproduct, userId: userId, productId: this.productData.id
        } as cart
        this.product.AddtoCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId)
            this.removecart = true;
            this.cd.detectChanges();
          }
        })
      }
    }
  }
  RemovefromCart(productId: number | string) {
    this.product.removeitemfromcart(productId);
    if (!localStorage.getItem('user')) {
      this.product.removeitemfromcart(productId);
      this.removecart = false;
    } else {
      let user=localStorage.getItem('user')
      let userId=user && JSON.parse(user).id
      console.log(this.cartdata);
     this.cartdata && this.product.removetocart((this.cartdata.id)).subscribe((result)=>{
        if(result){
          this.product.getCartList(userId)
        }
      })
      this.removecart = false
    }
    this.cd.detectChanges();
  }
}
