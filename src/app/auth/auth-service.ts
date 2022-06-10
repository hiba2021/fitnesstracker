import {MatSnackBar} from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Store} from '@ngrx/store'

import { AngularFireAuth} from 'angularfire2/auth'

import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Trainingservice } from '../training/training.service';
import { UIService } from '../shared/ui.service';

import * as fromRoot from '../app.reducer';

import * as UI from '../shared/ui.actions'; // to dispatch ui actions on store
import * as Auth from './auth.actions'; // to dispatch authactions on store


@Injectable()
export class AuthService{
    
//Adding a constructor to recieve the router
constructor(private router:Router,
            private afAuth:AngularFireAuth,
            private trainingService:Trainingservice,
            private snackbar:MatSnackBar, //bind matsnackbarmodule to a private 
                                            //property called snackbar
            private uiService:UIService,
            //private store:Store<{ui:fromApp.State}>//generic type i.e will have <>
                                                  //give access to the global store
                                            
            private store:Store<fromRoot.State>                                      ){}


    private user: User;

    // we do not need authChange and isAuthenticated anymore as we are using ngrx/store

    // authChange=new Subject<boolean>();//true or false, to indicate if we are signed in or not
    //                         //private not added since it needs to be public
    //                         //subject is a generic type:it can load <payloads> of different types
    //                         //here payload of "boolean" is passed
    //                         //this will be executed whenever we registerUser()
                        
    //  private isAuthenticated=false;  
     
    
    //it is best to call this fn on start of the app 
     initAuthListener(){//using Angularfire to listen to any authentication status
       
        this.afAuth.authState.subscribe(user=>{
            if(user){//we are switching to authenticated
                
                // this.authChange.next(true);//whoever is subscribing to authchange will get this data 
                // //here authchange is from loggedout to login ie we are emiting an event
                // this.isAuthenticated=true;

                this.store.dispatch(new Auth.SetAuthenticated());

                this.router.navigate(['/training']);// we redirect
                console.log('authsuccessfully');
               const ID=this.afAuth.auth[`X`];
                return ID;
            }
            else{
                this.trainingService.cancelSubscriptions();//cancel subscriptions
                
                // this.authChange.next(false);//emit an event
                // this.isAuthenticated=false;

                this.store.dispatch(new Auth.SetUnauthenticated());

                this.router.navigate(['/login']);//redirect to login page
            }
        }

        );//reaching out to the angularfireauth
                                           //it has the authState object 
                                        // this is an observable which we can subscribe
                                       //and will emit an event whenever the authentication ststus changes.
                                    }
                        
    registerUser(authData:AuthData){
        // this.user={         //create a user object
        //     email:authData.email,
        //     userId:Math.round(Math.random()*10000).toString()
        // }

        //this.uiService.loadingStateChanged.next(true);
         //reaching out to the uiservice, and 
                //call the next method on the loadingStateChanged subject
                //set to true to indicate
                //loading started - spinner on

        //use the injected store instead of UIservice
        //here we dispatch an action
        // which is an object having type property
       // this.store.dispatch({type:'START_LOADING'});

       //Now we need to dispatch actions from ui.actions, so we use
       this.store.dispatch(new UI.StartLoading()); // class in ui.actions
                                                   // we dont have to reference any specific constants     
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result=>
            {
                //this.uiService.loadingStateChanged.next(false);//stop spinner
               // this.store.dispatch({type:'STOP_LOADING'});
               this.store.dispatch(new UI.StopLoading()); 
               this.user = result.user;
                console.log(result,'result of creating account');

            })
        .catch(error=>{
            //this.uiService.loadingStateChanged.next(false);// stop spinner
           // this.store.dispatch({type:'STOP_LOADING'});
        
           this.store.dispatch(new UI.StopLoading()); 
            this.uiService.showSnackBar(error.message,null,3000);
           
            //this.snackbar.open(error.message,null,{
               // duration:3000
           // });
                                    }
                                         );
        
    }                              


  login(authData:AuthData){
        // this.user={         //create a user object
        //     email:authData.email,
        //     userId:Math.round(Math.random()*10000).toString()
        // }
        
        //this.uiService.loadingStateChanged.next(true);
        //this.store.dispatch({type:'START_LOADING'});
        this.store.dispatch(new UI.StartLoading()); 

       this.afAuth.auth.signInWithEmailAndPassword(authData.email,authData.password)
        .then(result=>
            {
               // this.uiService.loadingStateChanged.next(false);//stop spinner
               //this.store.dispatch({type:'STOP_LOADING'});
               this.store.dispatch(new UI.StopLoading()); 
               console.log(result,'result of sign in');
                
            })
        .catch(error=>{
            //this.uiService.loadingStateChanged.next(false);//stop spinner
           // this.store.dispatch({type:'STOP_LOADING'});
           this.store.dispatch(new UI.StopLoading());  
           this.uiService.showSnackBar(error.message,null,3000);
                                    }
                                         );
    }

    logout(){
        console.log('inlogout of headercomponent');
        const hello=this.afAuth.auth.signOut();
        console.log(hello);
        this.afAuth.auth.signOut();
        //this.router.navigate(['/']);
      
    }

    

// no need of this as the action file has isAuth helper method

    // isAuth(){ //return true if user is null, will return false, if this user not equal to null
    //    // return this.user!=null;
    //    return this.isAuthenticated;
    // }

   
    
}