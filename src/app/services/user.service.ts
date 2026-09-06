import { EventEmitter, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { signup } from '../interface/signup';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { login } from '../interface/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private platformId = inject(PLATFORM_ID)
  Invaliduser = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }
  url = 'http://localhost:3000/users';
  usersignUp(data: signup) {
    return this.http.post(this.url, data, { observe: 'response' }).subscribe((result) => {
      if (result && result.body ) {
        if (isPlatformBrowser(this.platformId))
          localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
    })
  }
  reloaduser() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('user')) {
        this.router.navigate(['/']);
      }
    }
  }
  userlogin(data: login) {
    return this.http.get<signup[]>(`${this.url}?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result) => {
      if (result && result.body && result.body.length) {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('user', JSON.stringify(result.body[0]))
        }
        console.log('user is set');
        this.Invaliduser.emit(false);
        this.router.navigate(['/'])
      }
      else {
        this.Invaliduser.emit(true)
      }
    })
  }

}