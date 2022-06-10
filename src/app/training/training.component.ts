import { Trainingservice } from './training.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {Store} from '@ngrx/store';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
 // exerciseSubscription:Subscription; dont need this anymore

  ongoingTraining$:Observable<boolean>;

  constructor(
    private trainingService:Trainingservice,
    private store:Store<fromTraining.State> // we can use this in ngoninit instead of oir exercise subscription here
    ) { }

  ngOnInit() {
    this.ongoingTraining$=this.store.select(fromTraining.getIsTraining);
    // console.log('in training component');
    // this.exerciseSubscription=this.trainingService.exerciseChanged.subscribe(
    //   //the above statement will fire whenever we get a new exercise.
    //   //get the exercise as a value inside of the susbscribe method
    //   exercise=>{
    //     if(exercise){
    //       this.ongoingTraining=true;//there is a selected exercise
    //       console.log('ongoingtraining true');
    //     }
    //     else{
    //       this.ongoingTraining=false;
    //       console.log('ongoingtraining false');

    //     }

    //   }
    // )
  }


  // ngOnDestroy(){
  //   if(this.exerciseSubscription){
  //     this.exerciseSubscription.unsubscribe();
  //   }
  // }
}
