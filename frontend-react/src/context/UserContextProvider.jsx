import React from "react";
import { UserContext } from "./userContext";
import { loginUser, logoutUser } from "../services/auth.service";
import { userReducer } from "./userReduce";
import { userType } from "./userTypes";

export const UserContextProvider = ({
    children
}) => {
    const initialState = {
        user: null,
        isLogged: false,
    };

    const [state, dispatch] = React.useReducer(userReducer, initialState);

    const login = async (user) => {
        try {
            const response = await loginUser(user);

            if(response) {
                dispatch({
                    type: userType.logIn,
                    payload: response
                });
            }
        } catch (error) {
            console.error("Error al iniciar sesión", error)
        }
    }

    const logout = async () => {
        try {
            const response = await logoutUser();
            if(response) {
                dispatch({
                    type: userType.logOut
                })
            }
        } catch (error) {
            console.error("Error al cerrar sesión", error);
            throw new Error("Error al cerrar sesión")
        }
    };

    return (
        <UserContext.Provider value={{
            state, login, logout
        }}>
            {children}

        </UserContext.Provider>
    )
}