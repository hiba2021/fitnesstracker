//once any service created, add in the providers of the appmodule.
//to control global UI functionalities

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
//import {Subject} from 'rxjs';

@Injectable()
export class UIService{
//loadingStateChanged = new Subject<boolean>();//loadingStateChanged eventlistener
                                            //is a new Subject which wraps a boolean
                                            // to indicate if loading started or finished

constructor(
    private snackBar:MatSnackBar
){}


 //implement a method to show snackbar
 // with a message, and an action and a duration                                           
showSnackBar(message,action,duration){
this.snackBar.open(message,action,
    {
        duration:duration
    });
}
                                        
                                        }