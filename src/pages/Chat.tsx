import { useEffect } from "react"
import ChatBox from "../components/ChatBox"
import ConversationsBox from "../components/ConversationsBox"
import { UsersBox } from "../components/UsersBox"
import { useAtomValue } from "jotai"
import userAtom from "../store/userAtom"

const Chat = () => {
    const user = useAtomValue(userAtom)

    useEffect(() => {
        console.log(user)
    }, [])

    return (
        <div className="flex w-full justify-between gap-4">
            <UsersBox />
            <ChatBox />
            <ConversationsBox />
        </div>
    )
}

export default Chat
