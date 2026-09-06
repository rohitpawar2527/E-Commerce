import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SellerAuth } from './seller-auth/seller-auth';
import { SellerHome } from './seller-home/seller-home';
import { authGuard } from './auth-guard';
import { SellerAddProduct } from './seller-add-product/seller-add-product';
import { SellerProductList } from './seller-product-list/seller-product-list';
import { SellerUpdateProduct } from './seller-update-product/seller-update-product';
import { Searchdata } from './searchdata/searchdata';
import { ProductDetails } from './product-details/product-details';
import { UserAuth } from './user-auth/user-auth';
import { MyCart } from './my-cart/my-cart';
import { Checkout } from './checkout/checkout';
import { MyOrders } from './my-orders/my-orders';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'seller-auth',
        component: SellerAuth
    },
    {
        path: 'seller-home',
        component: SellerHome,
        canActivate: [authGuard]
    },
    {
        path: 'seller-product-list',
        component: SellerProductList,
        canActivate: [authGuard]
    },
    {
        path: 'seller-add-product',
        component: SellerAddProduct,
        canActivate: [authGuard]
    },
    {
        path: 'seller-update-product/:id',
        component: SellerUpdateProduct,
        canActivate: [authGuard]
    },
    {
        component: Searchdata,
        path: 'searchdata/:query'
    },
    {
        component:ProductDetails,
        path:'details/:productId'
    },
    {
        component:UserAuth,
        path:'user-auth'
    },
    {component:MyCart,
        path:'my-cart'
    },
    {component:Checkout,
        path:'checkout'
    },
    {component:MyOrders,
        path:'my-orders'
    }
];
