import { useState, useEffect } from "react"
import api from "../services/api"
import { useAtomValue, useSetAtom } from "jotai"
import conversationsAtom from "../store/conversationsStore"
import log from "../utils/log"
import userAtom from "../store/userAtom"

type UserType = {
    userId: number
    username: string
    avatar: string
}

export const UsersBox = () => {
    const [users, setUsers] = useState<UserType[] | null>(null)
    const [allUsers, setAllUsers] = useState<UserType[] | null>(null)
    const setConversations = useSetAtom(conversationsAtom)
    const user = useAtomValue(userAtom)

    const getUsers = async () => {
        if (!user.userData) {
            return
        }

        const usersData = (await api.users.getUsers()).data
        log.log(`User: ${user.userData.id} fetched all users`)
        setUsers(usersData)
        setAllUsers(usersData)
    }

    const search = (term: string) => {
        if (term === "") {
            return setUsers(allUsers)
        }

        if (!allUsers) {
            return
        }

        const searchRes = allUsers.filter((user) =>
            user.username.toLowerCase().includes(term.toLowerCase())
        )
        setUsers(searchRes)
    }

    const inviteUser = async (userId: number) => {
        try {
            const conversationId = crypto.randomUUID()
            await api.users.inviteUser(userId, conversationId)
            log.log(`User: ${user.userData?.id} invited user: ${userId}`)
            setConversations((prev) => ({
                ...prev,
                invitesSent: [...prev.invitesSent, conversationId]
            }))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="max-h-full max-w-80 w-full flex flex-col border border-slate-300 rounded-md p-4">
            <input
                onInput={(e) => search(e.currentTarget.value)}
                type="text"
                placeholder="Search user"
                className="w-full"
            />
            <div className="flex flex-col w-full h-full overflow-y-scroll">
                {users &&
                    users.map((user) => {
                        return (
                            <button
                                onClick={() => inviteUser(user.userId)}
                                key={user.userId}
                                className="text-nowrap flex hover:bg-black/10 transition-all cursor-pointer"
                            >
                                {user.username}
                            </button>
                        )
                    })}
            </div>
        </div>
    )
}

export default UsersBox
