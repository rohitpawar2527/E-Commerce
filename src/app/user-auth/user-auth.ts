import { Component } from '@angular/core';
import { cart, product, signup } from '../interface/signup';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { login } from '../interface/login';
import { Productservice } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-auth.html',
  styleUrl: './user-auth.css',
})
export class UserAuth {
  authError: string = ""
  showlogin: boolean = true;
  constructor(private user: UserService, private product: Productservice) { }
  ngOnInit(): void {
    this.user.reloaduser();
  }
  onSignUp(data: signup) {
    this.user.usersignUp(data);
  }
  onLogIn(data: login) {
    this.user.userlogin(data);
    this.user.Invaliduser.subscribe((result) => {
      if (result) {
        this.authError = "Please enter valid details";
      }
      else {
        this.localtoremotecart();
      }
    })
  }
  OpenLogin() {
    this.showlogin = true;
  }
  Opensignup() {
    this.showlogin = false;
  }
  localtoremotecart() {
    let data = localStorage.getItem('localcart');
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id
    if (data) {
      let cartDataList: product[] = JSON.parse(data)

      cartDataList.forEach((product: product, index) => {
        const { id, ...restproduct } = product
        let cartData: cart = {
          ...restproduct,
          productId: product.id,
          userId
        } as cart
        setTimeout(() => {
          this.product.AddtoCart(cartData).subscribe((result) => {
            if (result) {
              console.log('item stored in db');
            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localcart')
          }
        }, 500)
      })
    }
    setTimeout(() => {
      this.product.getCartList(userId)
    },2000)
  }
}

