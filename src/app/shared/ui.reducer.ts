import { STOP_LOADING } from './ui.actions';

//reducer to just focus on the isLoading state

import { START_LOADING, UIActions } from './ui.actions';


 export interface State{
    isLoading:boolean;
}

const initialState:State={
    isLoading:false //setting isLoading to false initially
}

export function uiReducer(state=initialState,action:UIActions){
switch(action.type){
    case START_LOADING:
        return{
            isLoading:true
        };

    case STOP_LOADING:
        return{
            isLoading:false
        };

    default :
        return state;

}

}

export const getIsLoading = (state:State) =>state.isLoading;