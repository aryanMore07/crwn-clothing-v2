import USER_ACTION_TYPES from "./userTypes";

const INITIAL_STATE = {
    currentUser: null,
}

// User Reducer Which takes two parameters ( state, action ) 
// action has a object with two keys 1: type and 2: payload
export const userReducer = ( state = INITIAL_STATE, action = {} ) => {
    const { type, payload } = action;

    switch (type) {
        case  USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }    
        default:
            return state;
    };
};
