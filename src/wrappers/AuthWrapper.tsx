import { Outlet, useNavigate } from "react-router"
import SideNav from "../components/SideNav"
import { useAtomValue } from "jotai"
import userAtom from "../store/userAtom"
import { useEffect } from "react"

const AuthWrapper = () => {
    const user = useAtomValue(userAtom)
    const navigate = useNavigate()

    useEffect(() => {
        if (user.userData === null) {
            navigate("login")
        }
    })

    return (
        <div className="flex h-dvh w-dvw">
            <SideNav />
            <div className="h-dvh w-full flex items-center justify-center overflow-hidden p-4 ">
                <div className="flex w-full h-full max-w-[1280px]">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AuthWrapper
