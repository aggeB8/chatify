import { useAtom, useAtomValue } from "jotai"
import chatAtom from "../store/chatStore"
import api from "../services/api"
import { useState } from "react"
import userAtom from "../store/userAtom"

const ChatBox = () => {
    const user = useAtomValue(userAtom)
    const [chat, setChat] = useAtom(chatAtom)
    const [message, setMessage] = useState("")

    const updateChat = async () => {
        if (!chat) {
            return
        }

        const chatData = (await api.messages.getMessages(chat.activeChat)).data

        setChat({
            activeChat: chat.activeChat,
            chatData: chatData
        })
    }

    const sendChat = async (message: string) => {
        if (!chat) {
            return
        }

        try {
            await api.messages.createMessage(message, chat?.activeChat)
            updateChat()
        } catch (e) {
            console.log(e)
        }
    }

    const deleteMessage = async (msgId: string) => {
        try {
            await api.messages.deleteMessage(msgId)
            updateChat()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="h-full w-full flex items-center justify-center border border-slate-300 rounded-md p-4">
            {chat && user ? (
                <div className="h-full w-full flex flex-col">
                    <div className="h-full flex flex-col">
                        {chat.chatData.map((message) => {
                            return (
                                <>
                                    {message.userId === user.userData?.id ? (
                                        <p
                                            onClick={() => deleteMessage(message.id)}
                                            id={message.id}
                                            className="self-end hover:text-red-600 cursor-pointer"
                                        >
                                            {message.text}
                                        </p>
                                    ) : (
                                        <p id={message.id}>{message.text}</p>
                                    )}
                                </>
                            )
                        })}
                    </div>
                    <div className="flex gap-2">
                        <input
                            onInput={(e) => setMessage(e.currentTarget.value)}
                            type="text"
                            placeholder="Send message"
                            className="w-full border border-gray-300 px-2 rounded-md"
                        />
                        <button
                            onClick={() => sendChat(message)}
                            className="text-nowrap bg-green-500 p-2 rounded-md text-white"
                        >
                            Send chat
                        </button>
                    </div>
                </div>
            ) : (
                <p>Click on a conversation to chat</p>
            )}
        </div>
    )
}

export default ChatBox
