import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { Navigate, Outlet } from "react-router-dom";

export const PubliRoutes = () => {
    const { state } = useContext(UserContext);

    return !state.isLogged ? <Outlet /> : <Navigate to={"/home"} />
}