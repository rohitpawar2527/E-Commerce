import { Component } from '@angular/core';
import { product } from '../interface/signup';
import { Productservice } from '../services/product.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-product-list',
  imports: [CommonModule,FontAwesomeModule,RouterLink],
  templateUrl: './seller-product-list.html',
  styleUrl: './seller-product-list.css',
})
export class SellerProductList {
  productList: product[] = []
  productMessage: undefined | string
  icon = faTrash
  edit= faEdit
  constructor(private product: Productservice, private router: Router) { }
  ngOnInit(): void {
    this.product.productList().subscribe((data:product[]) => {
      this.productList = data;
    })
  }
  fetchitems(){
    this.product.productList().subscribe((data:product[])=>{
      this.productList=data;
    })
  }
  deleteProduct(id: number | string):void{
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage="Product is deleted"
        this.fetchitems();
      }
    })
    setTimeout(()=>{
      this.productMessage=undefined
    },3000);
  }
}
