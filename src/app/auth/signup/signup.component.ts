import { AuthService } from './../auth-service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { Observable } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 // isLoading=false;
 isLoading$:Observable<boolean>; 
//  loadingSubs:Subscription;

  maxDate:any;
  constructor(private authService:AuthService,
              private uiService:UIService,
              private store:Store<fromRoot.State>
              ) { }

  ngOnInit() {
    this.isLoading$=this.store.select(fromRoot.getIsLoading);
    // this.loadingSubs=this.uiService.loadingStateChanged.subscribe(isLoading=>
    //   {
    //     this.isLoading=isLoading;
    //   });
    this.maxDate=new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }

onSubmit(form:NgForm){
this.authService.registerUser({
  email:form.value.email,
  password:form.value.password
});
}

// ngOnDestroy(){
//   if(this.loadingSubs){
//     this.loadingSubs.unsubscribe();
//   }
// }
}
