import { FINISH_CHECKING_LOGIN, 
    //START_LOGIN, 
    LOGIN, 
    //START_TOKEN_RENEW, 
    LOGOUT} from './../types/index';

const initialState = {
    checking: true,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: 
            return {
                ...state,
                checking: false,
                uid: action.payload.uid,
                name: action.payload.name,
            }
        case FINISH_CHECKING_LOGIN: 
            return {
                ...state,
                checking: false,
            }
        case LOGOUT: 
            return {
               checking: false, 
            }
        default:
            return state;
    }

}