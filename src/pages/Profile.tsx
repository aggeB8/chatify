import { useAtomValue } from "jotai"
import { useState, type SyntheticEvent } from "react"
import userAtom from "../store/userAtom"
import api from "../services/api"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

const Profile = () => {
    const user = useAtomValue(userAtom)
    const navigate = useNavigate()
    const [deleteClickCount, setDeleteClickCount] = useState(0)

    const [form, setForm] = useState({
        username: user.userData?.user,
        email: user.userData?.email,
        avatar: user.userData?.avatar
    })

    const handleChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        setForm({ ...form, [target.name]: target.value })
    }

    const isValidUrl = (url: string | undefined) => {
        if (!url) {
            return
        }

        try {
            return Boolean(new URL(url))
        } catch {
            return false
        }
    }

    const updateUser = async () => {
        if (!user.userData) {
            return
        }

        try {
            await api.users.updateUser(user.userData?.id, form)

            if (user.userData.user !== form.username) {
                toast.warn("Logging out because of username change.")
                navigate("/logout")
            }
        } catch (e) {
            console.log(e)
        }
    }

    const deleteUser = async () => {
        if (!user.userData) {
            return
        }

        setDeleteClickCount(deleteClickCount + 1)

        if (deleteClickCount < 1) {
            return toast.warn("Are you sure you want to delete your user? Click again to confirm")
        } else if (deleteClickCount < 2) {
            return toast.warn("Once again...")
        }

        try {
            await api.users.deleteUser(user.userData.id)
            navigate("/logout")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-4">
            {isValidUrl(form.avatar) && (
                <img
                    src={form.avatar}
                    alt=""
                    className="max-h-20 max-w-20 h-full w-full bg-slate-500 rounded-full"
                />
            )}

            <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onInput={handleChange}
                className=""
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className=""
            />
            <input
                type="url"
                name="avatar"
                placeholder="Avatar URL"
                value={form.avatar}
                onChange={handleChange}
                className=""
            />
            <button
                onClick={() => updateUser()}
                className="bg-yellow-500 p-2 text-white rounded-md"
            >
                Update
            </button>
            <button onClick={() => deleteUser()} className="bg-red-500 p-2 text-white rounded-md">
                Delete my user
            </button>
        </div>
    )
}

export default Profile
