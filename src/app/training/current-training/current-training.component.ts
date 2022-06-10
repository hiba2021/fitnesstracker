import { Exercise } from './../exercise.model';
import { Trainingservice } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

import {Store} from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

 
  
  progress=0;
  timer!: number;
  exercise:Exercise;
  
  constructor(
    private dialogue:MatDialog,
    private trainingService:Trainingservice,
    private store:Store<fromTraining.State>
    ) { }

  ngOnInit() {
 this.startOrResumeTimer();
  }

startOrResumeTimer(){ 

  this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
    const step=ex.duration / 100 * 1000;
    // this.trainingService.getrunningExercise().duration / 100 * 1000;//divided by 100 coz 100 is the fixed max % , 
    //since in millisecond, we multiply by 1000
this.timer=window.setInterval(()=>{
this.progress=this.progress + 1;
if(this.progress>=100){
this.trainingService.completeExercise();
clearInterval(this.timer);
}
},step);//step need not necessarily be 1000,it depends on the duration of each exercise

  })

}

  onStop(){
    clearInterval(this.timer);
    const dialogRef=this.dialogue.open(StopTrainingComponent,{data:{
      progress:this.progress
    }
  });

dialogRef.afterClosed().subscribe(result=>{
if(result){
  this.trainingService.cancelExercise(this.progress);
}
else{
  this.startOrResumeTimer();
}
});

  }

}
