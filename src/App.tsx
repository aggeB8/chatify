import { BrowserRouter, Route, Routes } from "react-router"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

import userAtom from "./store/userAtom"
import { useSetAtom } from "jotai"
import { useEffect } from "react"
import api from "./services/api"
import { ToastContainer } from "react-toastify"

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
        <main className="h-dvh w-dvw flex items-center justify-center">
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </main>
    )
}

export default App
