import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SellerService } from './services/seller.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID)
  const sellerService = inject(SellerService)
  const router = inject(Router)
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('seller') || sellerService.isSellerSignUp.value) {
      return true;
    }
    else {
      return router.navigate(['/seller-auth'])
    }
  }
  return true;
};
