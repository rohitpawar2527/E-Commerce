import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductList } from './seller-product-list';

describe('SellerProductList', () => {
  let component: SellerProductList;
  let fixture: ComponentFixture<SellerProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerProductList],
    }).compileComponents();

    fixture = TestBed.createComponent(SellerProductList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
