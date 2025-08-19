import { useEffect } from "react"
import ChatBox from "../components/ChatBox"
import ConversationsBox from "../components/ConversationsBox"
import { UsersBox } from "../components/UsersBox"
import { useSetAtom } from "jotai"
import conversationsAtom from "../store/conversationsStore"
import api from "../services/api"

const Chat = () => {
    const setConversations = useSetAtom(conversationsAtom)

    const fetchConversation = async () => {
        const conversations = (await api.messages.getConversations()).data
        setConversations(conversations)
    }

    useEffect(() => {
        fetchConversation()
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
