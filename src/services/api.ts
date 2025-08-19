import axios from "axios"
import { toast } from "react-toastify"

const client = axios.create({
    baseURL: "https://chatify-api.up.railway.app"
})

client.interceptors.response.use(
    (res) => {
        const successMessage = res.data.message
        if (successMessage) {
            toast.success(successMessage)
        }
        return res
    },
    (err) => {
        const errorMessage = err.response.data.error
        if (errorMessage) {
            toast.error(errorMessage)
        }
        return err
    }
)

const api = {
    auth: {
        getCsrfToken: () => {
            return client.patch("/csrf")
        },
        login: (username: string, password: string, csrfToken: string) => {
            return client.post("/auth/token", {
                username: username,
                password: password,
                csrfToken: csrfToken
            })
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
        getUsers: () => {
            return client.get("/users")
        },
        getUser: (userId: number) => {
            return client.get(`/users/${userId}`)
        },
        deleteUser: (userId: number) => {
            return client.delete(`/users/${userId}`)
        },
        updateUser: (userId: number, updateData: unknown) => {
            return client.put("/user", {
                userId: userId,
                updatedData: updateData
            })
        },
        inviteUser: (userId: number, guid: string) => {
            return client.post(`/invite/${userId}`, {
                conversationId: guid
            })
        }
    },
    messages: {
        getConversations: () => {
            return client.get("/conversations")
        },
        getMessages: (conversationId?: string) => {
            return client.get(
                `/messages${conversationId ? "?conversationId=" + conversationId : null}`
            )
        },
        createMessage: (text: string, conversationId: string) => {
            return client.post("/messages", {
                text: text,
                conversationId: conversationId
            })
        },
        deleteMessage: (msgId: string) => {
            return client.delete(`/messages/${msgId}`)
        }
    },
    setJwtAuth: (jwtToken: string) => {
        client.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
    }
}

export default api
