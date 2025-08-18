import { Link } from "react-router"
import api from "../services/api"
import { useAtom } from "jotai"
import userAtom from "../store/userAtom"
import { useNavigate } from "react-router"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState, type SyntheticEvent } from "react"

const Auth = ({ method }: { method: "Register" | "Login" }) => {
    const navigate = useNavigate()

    const [user, setUser] = useAtom(userAtom)

    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
        email: "",
        avatar: ""
    })

    const handleChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        if (e.target) {
            setFormValues({ ...formValues, [target.name]: target.value })
        }
    }

    const login = (jwtToken: string) => {
        const userData: {
            avatar: string
            email: string
            id: number
            invite: null | string
            user: string
        } = jwtDecode(jwtToken)

        setUser((user) => ({
            ...user,
            userData: {
                id: userData.id,
                user: userData.user,
                email: userData.email,
                avatar: userData.avatar
            }
        }))

        api.setJwtAuth(jwtToken)
        navigate("/chat")
    }

    const action = async () => {
        switch (method) {
            case "Register":
                try {
                    await api.auth.register(
                        formValues.username,
                        formValues.password,
                        formValues.email,
                        formValues.avatar,
                        user.csrfToken
                    )
                    navigate("/login")
                } catch (e) {
                    console.log(e)
                }
                break
            case "Login":
                try {
                    const jwtToken = (
                        await api.auth.login(
                            formValues.username,
                            formValues.password,
                            user.csrfToken
                        )
                    ).data.token

                    localStorage.setItem("jwt", jwtToken)
                    login(jwtToken)
                } catch (e) {
                    console.log(e)
                }
                break
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("jwt")
        if (token) {
            login(token)
        }
    }, [])

    return (
        <div className="flex flex-col gap-2 p-2">
            <input
                onChange={handleChange}
                value={formValues.username}
                name="username"
                type="text"
                placeholder="Username"
                className="rounded-md border border-neutral-400 p-2"
            />

            <input
                onChange={handleChange}
                value={formValues.password}
                name="password"
                type="text"
                placeholder="Password"
                className="rounded-md border border-neutral-400 p-2"
            />

            {method === "Register" ? (
                <>
                    <input
                        onChange={handleChange}
                        value={formValues.email}
                        name="email"
                        type="text"
                        placeholder="Email"
                        className="rounded-md border border-neutral-400 p-2"
                    />
                    <input
                        onChange={handleChange}
                        value={formValues.avatar}
                        name="avatar"
                        type="text"
                        placeholder="Avatar"
                        className="rounded-md border border-neutral-400 p-2"
                    />
                </>
            ) : null}

            <div className="flex gap-2 w-full items-center justify-between">
                <Link to="/">Go to home</Link>
                <button
                    onClick={() => action()}
                    className="bg-blue-500 w-fit p-2 rounded-md text-white"
                >
                    {method}
                </button>
            </div>
        </div>
    )
}

export default Auth
