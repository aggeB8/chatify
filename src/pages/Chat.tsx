import ChatBox from "../components/ChatBox"
import ConversationsBox from "../components/ConversationsBox"
import { UsersBox } from "../components/UsersBox"

const Chat = () => {
    return (
        <div className="flex w-full justify-between gap-4">
            <UsersBox />
            <ChatBox />
            <ConversationsBox />
        </div>
    )
}

export default Chat
