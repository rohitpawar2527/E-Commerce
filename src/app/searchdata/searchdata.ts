import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Productservice } from '../services/product.service';
import { product } from '../interface/signup';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchdata',
  imports: [CommonModule,RouterLink],
  templateUrl: './searchdata.html',
  styleUrl: './searchdata.css',
})
export class Searchdata implements OnInit {
  searchDetails: undefined | product[];
  constructor(private route: ActivatedRoute, private product: Productservice, private cd:ChangeDetectorRef) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let query = params.get('query')
      console.log(query);
      if (query) {
        this.product.searchProducts(query).subscribe((result) => {
          this.searchDetails = result;
          this.cd.detectChanges();
          
      });
      }
    });
  }
}
