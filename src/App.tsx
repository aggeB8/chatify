import { BrowserRouter, Route, Routes } from "react-router"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

const App = () => {
    return (
        <main className="h-dvh w-dvw flex items-center justify-center">
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
