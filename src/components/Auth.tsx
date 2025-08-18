import { Link } from "react-router"
import api from "../services/api"
import { useAtomValue } from "jotai"
import userAtom from "../store/userAtom"

const Auth = ({ method }: { method: "Register" | "Login" }) => {
    const user = useAtomValue(userAtom)

    const formValues = {
        username: "",
        password: "",
        email: "",
        avatar: ""
    }

    const action = async () => {
        switch (method) {
            case "Register":
                api.auth.register(
                    formValues.username,
                    formValues.password,
                    formValues.email,
                    formValues.avatar,
                    user.csrfToken
                )
        }
    }

    return (
        <div className="flex flex-col gap-2 p-2">
            <input
                onChange={(e) => (formValues.username = e.target.value)}
                type="text"
                placeholder="Username"
                className="rounded-md border border-neutral-400 p-2"
            />

            <input
                onChange={(e) => (formValues.password = e.target.value)}
                type="text"
                placeholder="Password"
                className="rounded-md border border-neutral-400 p-2"
            />

            {method === "Register" ? (
                <>
                    <input
                        onChange={(e) => (formValues.email = e.target.value)}
                        type="text"
                        placeholder="Email"
                        className="rounded-md border border-neutral-400 p-2"
                    />
                    <input
                        onChange={(e) => (formValues.avatar = e.target.value)}
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
