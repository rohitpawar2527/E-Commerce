import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Productservice } from '../services/product.service';
import { product } from '../interface/signup';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgbCarouselModule,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  host: {
    'ngSkipHydration': 'true'
  }
})
export class Home implements OnInit {
  popularProducts: product[] = [];
  trendingProducts: product[] = [];
  constructor(private productservice: Productservice, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.productservice.popularProducts().subscribe((data) => {
      console.log(data);
      this.popularProducts = data;
      this.cdr.detectChanges();
    });
    this.productservice.trendingProducts().subscribe((data) => {
      console.log(data);
      if (data && data.length > 0) { this.trendingProducts = data;
        this.cdr.detectChanges();
       }
    });
  }
}
