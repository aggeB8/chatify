import { BrowserRouter, Route, Routes } from "react-router"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

import userAtom from "./store/userAtom"
import { useSetAtom } from "jotai"
import { useEffect } from "react"
import api from "./services/api"
import { ToastContainer } from "react-toastify"
import Chat from "./pages/Chat"
import HomeWrapper from "./wrappers/HomeWrapper"
import AuthWrapper from "./wrappers/AuthWrapper"
import Profile from "./pages/Profile"

const App = () => {
    const setUser = useSetAtom(userAtom)

    const grabCsrf = async () => {
        const data = (await api.auth.getCsrfToken()).data
        setUser((userAtom) => ({
            ...userAtom,
            csrfToken: data.csrfToken
        }))
    }

    useEffect(() => {
        grabCsrf()
    }, [])

    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route element={<HomeWrapper />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Route>

                    <Route element={<AuthWrapper />}>
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
