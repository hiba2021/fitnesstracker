import { User } from './../auth/user.model';
import { Exercise } from './exercise.model';

//reducer to just focus on the isAuthenticated or not state

import { 
        TrainingActions, 
        SET_AVAILABLE_TRAININGS,
        SET_FINISHED_TRAININGS,
        START_ACTIVE_TRAINING,
        STOP_ACTIVE_TRAINING
        } from './training.actions';

import *  as fromRoot from '../app.reducer'
import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface TrainingState{ // the state for this module
availableExercises:Exercise[];
finishedExercises:Exercise[];
activeTraining:Exercise;
}

//we cannot  add training as a state to our reducers map in app.reducer.ts as it is lazily loaded
// we want to load the state also lazily, just like the module.
// so importing training to the app reducer is not an option.
//our state here needs to 

export interface State extends fromRoot.State{ 
    // the app state doesnt know about the training state
    // but the trainingState knows about the app state
    training:TrainingState;
}
// this is now the new global state after the module has been lazyloaded

const initialState:TrainingState = {//inintialstate should be based on training state not State
    availableExercises:[],
finishedExercises:[],
activeTraining: null

}

export function trainingReducer(state=initialState,action:TrainingActions){
switch(action.type){
    case SET_AVAILABLE_TRAININGS:
        return{
            ...state,//pulling out the old properties to add it along to the available set of exercise
            availableExercises:action.payload
        };

    case SET_FINISHED_TRAININGS:
        return{
            ...state,
            finishedExercises:action.payload 

        };

    case START_ACTIVE_TRAINING:
        return{
            ...state,
            activeTraining:{...state.availableExercises.find(ex=>ex.id === action.payload)}
            //here in the reducer while starting an exercise from training service,
            //here, we find the training and store it in the activeTraining
            // we have to connect this to the current training
            // inject store to current training

        };

    case STOP_ACTIVE_TRAINING:
        return{
            ...state,
            activeTraining:null

        };

    default :
        return state;

}

}



//here it is on lazy loading so add to training module
//now we need to add the auth actions and auth reducer to the app reducer

export const getTrainingState=createFeatureSelector<TrainingState>('training')//'training' must match the identifier imported as in storeModule

//helper functions

export const getAvailableExercises=createSelector(getTrainingState,(state:TrainingState)=>state.availableExercises);
export const getFinishedExercises=createSelector(getTrainingState,(state:TrainingState)=>state.finishedExercises);
export const getActiveTraining=createSelector(getTrainingState,(state:TrainingState)=>state.activeTraining);


//add a new selector to get information if we are in active training or not
export const getIsTraining=createSelector(getTrainingState,(state:TrainingState)=>state.activeTraining!=null);
//not null means we are in training
// with this new selector added , we have to inject the training store to the training component
