import axios from "axios"

const client = axios.create({
    baseURL: "https://chatify-api.up.railway.app"
})

const paramBuilder = (rawUrl: string, params: object) => {
    const url = new URL(rawUrl)

    Object.keys(params).forEach((key) => {
        return params[key as keyof typeof params]
            ? url.searchParams.set(key, params[key as keyof typeof params])
            : null
    })

    return url.toString()
}

const api = {
    auth: {
        getCsrfToken: () => {
            return client.patch("/csrf")
        },
        register: (
            username: string,
            password: string,
            email: string,
            avatar: string,
            csrfToken: string
        ) => {
            return client.post("/auth/register", {
                username: username,
                password: password,
                email: email,
                avatar: avatar,
                csrfToken: csrfToken
            })
        }
    },
    users: {
        getUsers: (username?: string, limit?: string, offset?: string) => {
            const url = paramBuilder("/users", { username: username, limit: limit, offset: offset })

            return client.get(url)
        },
        getUser: (userId: string) => {
            return client.get(`/users/${userId}`)
        },
        deleteUser: (userId: string) => {
            return client.delete(`/users/${userId}`)
        },
        updateUser: (userId: string, updateData: {}) => {}
    }
}

export default api
