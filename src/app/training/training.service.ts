import { AuthService } from 'src/app/auth/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';

import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';
import {Store} from '@ngrx/store';
import { User } from '../auth/user.model';

@Injectable()
export class Trainingservice{

    exerciseChanged=new Subject<Exercise>();
    exercisesChanged=new Subject<Exercise[]>();//to emit the exercisesChanged event whenever we get new exercises
    finishedExerciseschanged=new Subject<Exercise[]>();
    private availableExercises: Exercise[]=[];
    private runningExercise: Exercise;//to store the exercise thst the user selected if any
    private fbSubs:Subscription[]=[];//fbSubs for firbasesubscriptions, which is
                                        //an array of subscriptions initially set to empty
    public user:User;
                                        
                                        


     constructor(
         private db:AngularFirestore,
         private uiService:UIService,
         private store:Store<fromTraining.State>,
         private afAuth :AngularFireAuth,
         
        

        )
        {}


fetchAvailableExercises(){
   
    this.store.dispatch(new UI.StartLoading());//to set the loadingstate

    this.fbSubs.push(this.db // reaching also to fbSubs array and push
    .collection('availableExercises')//the first subscription onto it
    .snapshotChanges()
    .pipe(map(docArray=>{
     return docArray.map(doc=>{
        return {
          id:doc.payload.doc.id,
          name:doc.payload.doc.data()['name'] , 
         duration:doc.payload.doc.data()['duration'] ,
          calories:doc.payload.doc.data()['calories'],
          userId:this.uid 
          
        } 
      });
    }))

    .subscribe(
        
        (exercises:Exercise[])=>{ //here the first method, we handle the data
        this.store.dispatch(new UI.StopLoading());// set the loadingstate to false
        console.log('in subscribe of fetchexercise');
        this.store.dispatch(new Training.SetAvailableTrainings(exercises));
    },
    
    error=>{ // here the second method , i.e the case of error
        this.store.dispatch(new UI.StopLoading());// set the loadingstate to false
        //to remove the spinner
        console.log('in error of fetchexercise');
        this.uiService.showSnackBar('Fetching exercises failed,please try again later',null,3000)
        //this.exercisesChanged.next(null);//no exercise appear
    }
    
    ));
 
    
}

startExercise(selectedID:string){
this.store.dispatch(new Training.StartTraining(selectedID));
}

// getrunningExercise(){
// return this.runningExercise;
// }

completeExercise(){
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
        this.addDatatoDatabase({
            ...ex,
            //...this.runningExercise,
            date:new Date(),
            userId:this.uid,
            state:'completed'
        });
        // this.runningExercise=null;
        // this.exerciseChanged.next(null);  
        this.store.dispatch(new Training.StopTraining());
    })

}

cancelExercise(progress:number){
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
        this.addDatatoDatabase({
            //...this.runningExercise,
           ... ex,
            duration:ex.duration*(progress/100),
            calories:ex.calories*(progress/100),
            date:new Date(),
            state:'cancelled',
            userId:this.uid
        });
        // this.runningExercise=null;
        // this.exerciseChanged.next(null);
        this.store.dispatch(new Training.StopTraining()); 
    })
   
}




fetchCompletedorCancelledExercises(){
    //return this.exercises.slice();//to return a copy of the exercises

   
        this.fbSubs.push(this.db
            .collection(`finishedExercises`).valueChanges()
            .subscribe(
        
              (exercises:Exercise[] )=>{
            //     this.finishedExerciseschanged.next(exercises);
           // map(res=>Object.values(res[this.uid]));
          
            console.log(exercises);
            this.store.dispatch(new Training.SetFinishedTrainings(exercises.filter(
                exercises => exercises.userId === this.uid)));
            }
            
            ));
    
    
   
}

cancelSubscriptions(){
    this.fbSubs.forEach(sub=>sub.unsubscribe());//unsubsribe for every subscription 
}                                               //in that array

private addDatatoDatabase(exercise:Exercise){
this.db.collection('finishedExercises').add(exercise);


}

get uid(){
    const ID = this.afAuth.auth[`X`];
    console.log(ID);
    return ID;
    //return this.db.collection('finishedExercises').valueChanges();
}

}




