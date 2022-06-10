

import {Action} from '@ngrx/store'
import { Exercise } from './exercise.model';

export const SET_AVAILABLE_TRAININGS ='[Training] Set Available Trainings';
// here [Training] is the identifier
export const SET_FINISHED_TRAININGS ='[Training] Set Fininshed Trainings';
//But in trainingservice along with available and finished trainings, there is also 
// active trainings, so add it to the training state
export const START_ACTIVE_TRAINING='[Training] Start Training';
export const STOP_ACTIVE_TRAINING='[Training] Stop Training';


export class SetAvailableTrainings implements Action{ // SetAvailableTrainings is the classname
readonly type = SET_AVAILABLE_TRAININGS;
constructor(public payload: Exercise[]){
}
}

export class SetFinishedTrainings implements Action{
    readonly type = SET_FINISHED_TRAININGS;
    constructor(public payload:Exercise[]){}
    }


export class StartTraining implements Action{ 
        readonly type = START_ACTIVE_TRAINING;
        constructor(public payload: string){}
        }  

 export class StopTraining implements Action{ 
            readonly type = STOP_ACTIVE_TRAINING;
           
            }         

   

    export type TrainingActions = SetAvailableTrainings | SetFinishedTrainings | StartTraining | StopTraining;