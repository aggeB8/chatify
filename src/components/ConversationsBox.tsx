import api from "../services/api"
import { useAtomValue, useSetAtom } from "jotai"
import chatAtom from "../store/chatStore"
import conversationsAtom from "../store/conversationsStore"
import log from "../utils/log"

export const ConversationsBox = () => {
    const conversations = useAtomValue(conversationsAtom)
    const setChat = useSetAtom(chatAtom)

    const fetchConversation = async (conversationId: string) => {
        try {
            const chatData = (await api.messages.getMessages(conversationId)).data
            log.log("Grabbed conversations")
            setChat({
                activeChat: conversationId,
                chatData: chatData
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="max-h-full max-w-80 w-full flex flex-col border border-slate-300 rounded-md p-4 ">
            <p className="text-gray-400">Conversations</p>
            <div className="flex flex-col w-full h-full overflow-hidden ">
                <p className="underline">Invites recieved</p>
                {conversations?.invitesReceived &&
                    conversations.invitesReceived.map((conversationId) => {
                        return (
                            <button
                                onClick={() => fetchConversation(conversationId)}
                                key={conversationId}
                                className="text-nowrap flex hover:bg-black/10 transition-all cursor-pointer"
                            >
                                {conversationId}
                            </button>
                        )
                    })}

                <p className="underline">Invites sent</p>
                {conversations?.invitesSent &&
                    conversations.invitesSent.map((conversationId) => {
                        return (
                            <button
                                onClick={() => fetchConversation(conversationId)}
                                key={conversationId}
                                className="text-nowrap flex hover:bg-black/10 transition-all cursor-pointer"
                            >
                                {conversationId}
                            </button>
                        )
                    })}

                <p className="underline">Participating</p>
                {conversations?.participating &&
                    conversations.participating.map((conversationId) => {
                        return (
                            <button
                                onClick={() => fetchConversation(conversationId)}
                                key={conversationId}
                                className="text-nowrap flex hover:bg-black/10 transition-all cursor-pointer"
                            >
                                {conversationId}
                            </button>
                        )
                    })}
            </div>
        </div>
    )
}

export default ConversationsBox
