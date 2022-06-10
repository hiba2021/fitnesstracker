import { Trainingservice } from './../training.service';
import { Exercise } from './../exercise.model';
import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import{Store} from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit,AfterViewInit {

  displayedColumns:string[] =['date','name','calories','duration','state'];
  //ia an array of strings, 
  //the names inside has to match the names in the matColumnDef of each ngcontainer column
  dataSource= new MatTableDataSource<Exercise>();
  //this property should have a value that is instantiated 
  //based on something (MATTABLEDATASOURCE) imported fron angular material
  //it is ageneric object where u define which kind of data you are passing in.
  // here its exercise

private exChangedSubscription:Subscription;

  @ViewChild(MatSort) sort:MatSort;
// Sort property defined of type MatSort
@ViewChild(MatPaginator) paginator:MatPaginator;//to get access

value='';
  constructor( 
    private trainingService:Trainingservice,
    private store:Store<fromTraining.State>
    ) { }

  ngOnInit() {
   //this.exChangedSubscription= this.trainingService.finishedExerciseschanged.subscribe(
    this.store.select(fromTraining.getFinishedExercises).subscribe(
    
   (exercises:Exercise[])=>{
      this.dataSource.data=exercises;
    });
     this.trainingService.fetchCompletedorCancelledExercises();
  }


  ngAfterViewInit(){
    //executes after the view is done rendering and initializing
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }

  doFilter(event:any){//filtering only needs to apply the filter ppty on the dataSource
this.dataSource.filter=event.target.value.trim().toLowerCase();
// console.log(this.dataSource.filter);
// console.log(event);
//return this.dataSource.filter;
  }

  //pagination is all about displaying how many rows you display and allowing 
  //the user to cycle btw pages


// ngOnDestroy(){
//   if(this.exChangedSubscription){
//     this.exChangedSubscription.unsubscribe();
//   }
// }

}
