import { useAtomValue } from "jotai"
import userAtom from "../store/userAtom"
import { useNavigate } from "react-router"

const SideNav = () => {
    const user = useAtomValue(userAtom)
    const navigate = useNavigate()

    return (
        <div className="h-full flex p-4 items-center justify-center ">
            <div className="flex flex-col gap-2 p-2 border border-slate-300 rounded-lg">
                <div className="flex items-center gap-2">
                    <img src={user.userData?.avatar} className="max-h-10 max-w-10 rounded-full" />
                    <p>{user.userData?.user}</p>
                </div>
                <button
                    onClick={() => navigate("/profile")}
                    className="p-2 bg-blue-500 rounded-md text-white w-full"
                >
                    Profile
                </button>
                <button
                    onClick={() => navigate("/chat")}
                    className="p-2 bg-blue-500 rounded-md text-white w-full"
                >
                    Chats
                </button>
                <button
                    onClick={() => navigate("/logout")}
                    className="p-2 bg-red-500 rounded-md text-white w-full"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default SideNav
