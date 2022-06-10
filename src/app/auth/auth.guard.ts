
//makes the user enter into training only after authorizing i.e by logging in
//once logged out, will not be able to go to training directly without logging in
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from "@angular/router";
import { Route } from '@angular/compiler/src/core';

import {Store} from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import {take } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate,CanLoad{

    constructor(
                //private authService :AuthService,
                private store:Store<fromRoot.State>,
                private router :Router
                ){}

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):any{
        // in canactivate we can use an observable to return true or false (instead of using true or false in the canactivate fn)
        // for utilising the ngrx store 
        
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));// this will return true or false
        
        
        // if(this.authService.isAuth()){
        //     return true;
        // }else{
        //     // to redirect the user to the home page
        //     this.router.navigate(['/login']);
        // }
        
    }

    canLoad(route:Route){

        return this.store.select(fromRoot.getIsAuth).pipe(take(1));



        // if(this.authService.isAuth()){
        //     return true;
        // }else{
        //     // to redirect the user to the home page
        //     this.router.navigate(['/login']);
        //     return false;
        // }
        
    }
}//the AuthGuard needs to 
//return a promise that resolves to true or 
//a observable that is true