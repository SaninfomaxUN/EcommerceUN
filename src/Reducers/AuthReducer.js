import { authTypes } from "../types/authTypes";

export const AuthReducer = (state,action) => {
    switch (action.type) {
        case authTypes.login:  //revisa el caso de login
            return{log:true}
            
            case authTypes.logout:          
              return {log:false}; //revisa el caso si es falso
    

        default:
           return state;
    }
}
