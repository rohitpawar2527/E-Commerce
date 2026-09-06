import { Component, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { product } from '../interface/signup';
import { Productservice } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-add-product.html',
  styleUrl: './seller-add-product.css',
})
export class SellerAddProduct {
  addProductMessage:string | undefined
  @ViewChild('addProductForm') addProductForm!:NgForm;
  constructor(private product:Productservice, private router:Router){}
  submit(data:product){
    this.product.addProduct(data).subscribe((result)=>{
      if(result){
        this.addProductMessage = "Product Added Successfully";
        this.addProductForm.resetForm();
        
      }
      setTimeout(()=>(this.addProductMessage = undefined),3000);
      
    })
  }
}
