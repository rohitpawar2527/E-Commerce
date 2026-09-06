import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { signup } from '../interface/signup';
import { login } from '../interface/login';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
    providedIn: 'root'
})

export class SellerService {
    private platformId = inject(PLATFORM_ID)
    isSellerSignUp = new BehaviorSubject<boolean>(false)
    constructor(private http: HttpClient, private router: Router) { }
    url = 'http://localhost:3000/seller';
    sellersignup(data: signup) {
        return this.http.post(this.url, data, { observe: 'response' }).subscribe((result) => {
            if (result) {
                this.isSellerSignUp.next(true);
                if (isPlatformBrowser(this.platformId))
                localStorage.setItem('seller', JSON.stringify(result.body));
                this.router.navigate(['seller-home']);
            }
        })

    }
    sellerlogin(data: login){
        return this.http.get<signup[]>(`${this.url}?email=${data.email}&password=${data.password}`, { observe: 'response'}).subscribe((result) =>{
            if(result && result.body && result.body.length > 0){
                 this.isSellerSignUp.next(true);
                 if (isPlatformBrowser(this.platformId))
                 localStorage.setItem('seller', JSON.stringify(result.body[0]));
                 this.router.navigate (['seller-home'])
            }
            else{
                console.warn('Invalid Email or Password');
            }
        }); 
    }
    reloadseller() {
        if (isPlatformBrowser(this.platformId)){
        if (localStorage.getItem('seller')) {
            this.isSellerSignUp.next(true);
            this.router.navigate(['seller-home']);
        }}
    }
}
