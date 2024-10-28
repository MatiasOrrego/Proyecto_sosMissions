import { userType } from "./userTypes";

export const userReducer = (state, action) => {
    switch (action.type) {
        case userType.logIn: {
            return {
                ...state,
                user: action.payload.data,
                isLogged: true,
            };
        };

        case userType.logOut: {
            return {
                ...state,
                user: null,
                isLogged: false
            }
        }

        default:
            return state;
    }
}