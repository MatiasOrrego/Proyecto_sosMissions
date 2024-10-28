import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PubliRoutes } from "./PubliRoutes"
import { Home } from "../views/Home"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PubliRoutes />}>
                    <Route path="/" element={<Home />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}