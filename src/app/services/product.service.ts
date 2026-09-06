import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { cart, order, product } from '../interface/signup';

import { Observable, of, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { response } from 'express';

@Injectable({
    providedIn: 'root'
})
export class Productservice {
    private platformId=inject(PLATFORM_ID);
    cartData= new Subject<product[]>()
    constructor(private http: HttpClient) { }
    url = 'http://localhost:3000/product';
    addProduct(data: product) {
        return this.http.post(this.url, data)
    }
    productList(): Observable<product[]> {
        return this.http.get<product[]>(this.url);
    }
    deleteProduct(id: number | string):Observable<product> {
        return this.http.delete<product>(`${this.url}/${id}`)
    }
    getProduct(id: string | number){
        return this.http.get<product>(`${this.url}/${id}`)
    }
    updateProduct(product:product){
        return this.http.put<product>(`${this.url}/${product.id}`,product)
    }
    popularProducts(){
        return this.http.get<product[]>(`${this.url}?_limit=6`)
    }
    trendingProducts(){
        return this.http.get<product[]>(`${this.url}`)
    }
    searchProducts(query:string){
        return this.http.get<product[]>(`${this.url}?q=${query}`)
    }
    LocalAddtoCart(data:product){
        let cartData = []
        let localcart = localStorage.getItem('localcart')
        if(!localcart){
            cartData=[data];
            localStorage.setItem('localcart',JSON.stringify([data]));   
        }
        else{
            cartData = JSON.parse(localcart)
            cartData.push(data)
            localStorage.setItem('localcart',JSON.stringify(cartData));
        }
        console.log('Cart Updated in Service:', cartData);
        this.cartData.next(cartData);
    }
    removeitemfromcart(productId:string | number){
        let cartData=localStorage.getItem('localcart')
        if(cartData){
            let items:product[]=JSON.parse(cartData)
            items = items.filter((items:product)=>productId!==items.id)
            localStorage.setItem('localcart',JSON.stringify(items))
            this.cartData.next(items)
        }
    }
    AddtoCart(cartData:cart){
        return this.http.post('http://localhost:3000/cart',cartData)
    }
    getCartList(userId:number|string){
        return this.http.get<product[]>('http://localhost:3000/cart?userId='+userId,{observe:'response'}).subscribe((result)=>{
            if(result && result.body){
                this.cartData.next(result.body)
            }            
        })
    }
    removetocart(cartId:number | string){
        return this.http.delete('http://localhost:3000/cart/'+cartId)
    }
    currentcart(){
        let userstore = localStorage.getItem('user')
        let userdata=userstore && JSON.parse(userstore)
        return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userdata.id)
    }
    orderNow(data:order){
        return this.http.post('http://localhost:3000/orders',data)
    }
  orderlist(): Observable<order[]> {
    if (isPlatformBrowser(this.platformId)) {
      let userstore = localStorage.getItem('user');
      let userId = userstore ? JSON.parse(userstore).id : null;

      if (userId) {
        return this.http.get<order[]>(`http://localhost:3000/orders?userId=${userId}`);
      }
    }
    return of([]);
  }
  deletecartItems(cartId:number|string){
    return this.http.delete('http://localhost:3000/cart/'+cartId,{observe:'response'}).subscribe((result)=>{
        if(result){
            this.cartData.next([]);
        }
    })
  }
  cancelOrder(orderId:number| string){
    return this.http.delete(`http://localhost:3000/orders/${orderId}`);
  }
}
