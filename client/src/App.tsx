import { BrowserRouter, Route, Routes } from "react-router"
import Register from "./pages/Register"

const App = () => {
    return (
        <main className="h-dvh w-dvw flex items-center justify-center">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </main>
    )
}

export default App
