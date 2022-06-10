// // a store added to the app folder
// // this will keep the main reducer, which will manipulate the main store thereafter
// // a reducer is just a function 
// // a function which we ll export and name it "appreducer"
// // this fn takes the old "state" as input and the incoming "action"
// // we dispatch actions to change the store, not done directly.

//  export interface State{
//     isLoading :boolean; //not object, but type definition
// }



// //to create a starting state
// //let the "initialState" be a javascript object,
// // where we want to manage the isLoading state
// // which is currently managed in the UIService 
// // with loadingStateChanged Listener
// // So "initialState" will be of type "State"
// const initialState :State ={
// isLoading:false
// }


// // here the incoming "state" will get a default value of "initialState"
// // here we need to get an "action" to trigger the change of "state"
// // from "isLoading" false to "isLoading" true
// // we use the switch() function
// // actions which are dispatched must have a type property
// export function appReducer(state,action){
//     switch (action.type){
//         case 'START_LOADING':
//           return{
//               isLoading:true
//           };

//         case 'STOP_LOADING':
//             return{
//                 isLoading:false
//             };

//         default:
//             return state;
//     }
// }

import {ActionReducerMap, 
        createFeatureSelector,
        createSelector} from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer'

export interface State {
    ui : fromUi.State;
    auth : fromAuth.State;
}


//grouping the reducers
export const reducers:ActionReducerMap<State>={
    ui:fromUi.uiReducer,
    auth:fromAuth.authReducer
};

export const getUiState=createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState,fromUi.getIsLoading);

export const getAuthState=createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth=createSelector(getAuthState,fromAuth.getIsAuth);