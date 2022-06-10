
//reducer to just focus on the isAuthenticated or not state

import { AuthActions,SET_AUTHENTICATED,SET_UNAUTHENTICATED  } from './auth.actions';


 export interface State{
    isAuthenticated:boolean;
}

const initialState:State={
    isAuthenticated:false //setting isAuthenticated to false initially
}

export function authReducer(state=initialState,action:AuthActions){
switch(action.type){
    case SET_AUTHENTICATED:
        return{
            isAuthenticated:true
        };

    case SET_UNAUTHENTICATED:
        return{
            isAuthenticated:false
        };

    default :
        return state;

}

}

export const getIsAuth = (state:State) =>state.isAuthenticated; // helper method for easier access


//now we need to add the auth actions and auth reducer to the app reducer