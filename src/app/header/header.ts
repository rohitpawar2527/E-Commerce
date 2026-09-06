import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { product } from '../interface/signup';
import { Productservice } from '../services/product.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuType: string = 'default';
  SellerName: string = "";
  userName: string = "";
  searchResult: undefined | product[];
  cartItems = 0;
  private platformId = inject(PLATFORM_ID);
  constructor(private router: Router, private product: Productservice, private cd: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (isPlatformBrowser(this.platformId)) {
          if (localStorage.getItem('seller') && val.url.includes('seller')) {
            this.menuType = "seller"
            if (localStorage.getItem('seller')) {
              let sellerstore = localStorage.getItem('seller');
              let sellerdata = sellerstore && JSON.parse(sellerstore);
              this.SellerName = sellerdata.name;
            }
          }
          else if (localStorage.getItem('user')) {
            let userstore = localStorage.getItem('user');
            let userdata = userstore && JSON.parse(userstore);
            this.userName = userdata.name;
            this.menuType = "user";
            this.product.getCartList(userdata.id);
          }
          else {
            this.menuType = 'default'
          }
          this.cd.detectChanges();
        }
      }
    });
    if (isPlatformBrowser(this.platformId)){
      let cartData = localStorage.getItem('localcart');
      if (cartData) {
        this.cartItems = JSON.parse(cartData).length
      }
    }
    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length
      this.cd.detectChanges();
    })
  }
  LogOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('seller')
      this.router.navigate(['/']);
    }
  }
  userLogOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user')
      this.router.navigate(['user-auth'])
      this.product.cartData.next([]);
    }
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      const queryValue = element.value.trim()
      if (!queryValue) {
        this.searchResult = undefined;
        return;
      }
      this.product.searchProducts(element.value).subscribe((data) => {
        if (data.length > 5) {
          data.length = 5;
        }
        this.searchResult = data;
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(val: string) {
    this.router.navigate([`searchdata/${val}`])
  }
  redirecttoDetails(id: string | number) {
    this.router.navigate([`/details`, id])
  }
  gotoOrders(){
    this.router.navigate(['/my-orders']);
  }
}
