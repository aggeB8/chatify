import { useSetAtom } from "jotai"
import chatAtom from "../store/chatStore"
import userAtom from "../store/userAtom"
import { useNavigate } from "react-router"
import { useEffect } from "react"

const Logout = () => {
    const setChat = useSetAtom(chatAtom)
    const setUser = useSetAtom(userAtom)
    const navigate = useNavigate()

    setChat(null)
    setUser((prev) => ({
        ...prev,
        userData: null
    }))
    localStorage.clear()

    useEffect(() => {
        setTimeout(() => {
            navigate("/")
        }, 2000)
    }, [])

    return <p>Logging out...</p>
}

export default Logout
