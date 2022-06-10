
import { NgForm } from '@angular/forms';
import { Trainingservice } from './../training.service';
import { Exercise } from './../exercise.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription} from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {


  exercises$:Observable<Exercise[]>;
  isLoading$:Observable<boolean>;


constructor(
          private trainingService:Trainingservice,
             private uiService:UIService,
             private store:Store<fromTraining.State>
           ) { }


ngOnInit() {
this.isLoading$=this.store.select(fromRoot.getIsLoading);
this.exercises$=this.store.select(fromTraining.getAvailableExercises)
this.fetchExercises();
}

onStartTraining(form:NgForm){
    this.trainingService.startExercise(form.value.exercise);//exercise is the name of the input used in mat-select
  }

fetchExercises(){
  this.trainingService.fetchAvailableExercises();
}

}

