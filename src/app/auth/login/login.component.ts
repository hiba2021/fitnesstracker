import { AuthService } from './../auth-service';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { Observable, Subscription } from 'rxjs';
//we need to create subscription with the store in this login component
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  isLoading$:Observable<boolean>;//another property, to switch whenever we get a new loading state
  //private loadingSubs:Subscription;

  constructor(private authService:AuthService,
              private uiService:UIService,
              //private store:Store<{ui:fromApp.State}>
              private store :Store<fromRoot.State>
              ) { }

  ngOnInit() {

//this.isLoading$=this.store.pipe(map(state => state.ui.isLoading));
    // this.loadingSubs=this.uiService.loadingStateChanged.subscribe(isLoading=>{
    //   this.isLoading=isLoading;
    // })

this.isLoading$=this.store.select(fromRoot.getIsLoading)

    this.loginForm=new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password:new FormControl('',{validators :[Validators.required]})
    })
  }

  onSubmit() {
   
    console.log('in onsubmit of loginform');
     console.log(this.loginForm.value.email);
      this.authService.login(
      {
        email:this.loginForm.value.email,
          password:this.loginForm.value.password});
    }
    
  // ngOnDestroy(){
  //   if(this.loadingSubs){
  //     this.loadingSubs.unsubscribe();

  //   }
  // }
}
