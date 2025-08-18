const LoginRegister = ({ method }: { method: "register" | "login" }) => {
    const formValues = {
        username: "",
        password: ""
    }

    const action = async (username: string, password: string) => {}

    return (
        <div className="flex flex-col gap-2 p-2">
            <input
                onChange={(e) => (formValues.username = e.target.value)}
                type="text"
                placeholder="test"
                className="rounded-md border border-neutral-400 p-2"
            />
            <input
                onChange={(e) => (formValues.password = e.target.value)}
                type="text"
                placeholder="test"
                className="rounded-md border border-neutral-400 p-2"
            />
            <div className="flex gap-2 w-full items-center justify-center">
                <button>s</button>
                <button
                    onClick={() => action(formValues.username, formValues.password)}
                    className="bg-blue-500 w-fit p-2 rounded-md text-white"
                >
                    {method === "register" ? "Register" : "Login"}
                </button>
            </div>
        </div>
    )
}

export default LoginRegister
