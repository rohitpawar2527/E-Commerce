import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { signup } from '../interface/signup';
import { Router } from '@angular/router';
import { login } from '../interface/login';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.html',
  styleUrl: './seller-auth.css',
})
export class SellerAuth {
  constructor(private seller: SellerService, private router: Router) {

  }
  showlogin= false;
  ngOnInit(): void {
    this.seller.reloadseller();
    
  }
  onSignUp(data: signup): void {
    this.seller.sellersignup(data)
  }
  onLogIn(data:login):void{
    this.seller.sellerlogin(data)
  }
  OpenLogin(){
    this.showlogin=true;
  }
  Opensignup(){
    this.showlogin=false;
  }
}


