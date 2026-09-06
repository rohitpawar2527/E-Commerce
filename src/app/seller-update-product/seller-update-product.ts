import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Productservice } from '../services/product.service';
import { product } from '../interface/signup';

@Component({
  selector: 'app-seller-update-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-update-product.html',
  styleUrl: './seller-update-product.css',
})
export class SellerUpdateProduct {
  updateProductMessage: string | undefined
  productData: product | undefined
  constructor(private route: ActivatedRoute, private router: Router, private product: Productservice) {

  }

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id')
    console.log(productId);
    if (productId) {
      this.product.getProduct(productId).subscribe((data) => {
        console.log(data);
        this.productData = data;
      })
    }
  }
  submit(data: product) {
    console.log(data);
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result: product) => {
      if (result) {
        this.updateProductMessage = "Product Updated Succesfully"
        setTimeout(() => {
          this.updateProductMessage = undefined
          this.router.navigate(['/seller-product-list'])
        }, 3000);
      }
    });


  }

}
