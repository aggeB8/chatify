import { useAtom, useAtomValue } from "jotai"
import chatAtom from "../store/chatStore"
import api from "../services/api"
import { useState } from "react"
import userAtom from "../store/userAtom"
import { toast } from "react-toastify"
import log from "../utils/log"

const ChatBox = () => {
    const user = useAtomValue(userAtom)
    const [chat, setChat] = useAtom(chatAtom)
    const [message, setMessage] = useState("")

    const updateChat = async () => {
        if (!chat || !user.userData) {
            return
        }

        const chatData = (await api.messages.getMessages(chat.activeChat)).data
        log.log(`User: ${user.userData.id} grabbed chat message data`)
        setChat({
            activeChat: chat.activeChat,
            chatData: chatData
        })
    }

    const sendMessage = async (message: string) => {
        if (!chat) {
            return
        }

        message.trim()
        if (message.length > 200) {
            return toast.error("Chat message is too long.")
        }

        try {
            await api.messages.createMessage(message, chat?.activeChat)
            log.log("Created chat message")
            updateChat()
        } catch (e) {
            console.log(e)
        }
    }

    const deleteMessage = async (msgId: string) => {
        try {
            await api.messages.deleteMessage(msgId)
            log.log("Deleted chat message")
            updateChat()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="h-full w-full flex items-center justify-center border border-slate-300 rounded-md p-4">
            {chat && user ? (
                <div className="h-full w-full flex flex-col">
                    <div className="h-full flex flex-col gap-2">
                        {chat.chatData.map((message) => {
                            return (
                                <>
                                    {message.userId === user.userData?.id ? (
                                        <p
                                            onClick={() => deleteMessage(message.id)}
                                            id={message.id}
                                            key={message.id}
                                            className="self-end hover:bg-red-600 transition-all p-2 bg-blue-400 text-white rounded-xl cursor-pointer"
                                        >
                                            {message.text}
                                        </p>
                                    ) : (
                                        <p
                                            key={message.id}
                                            id={message.id}
                                            className="p-2 bg-gray-400 w-fit rounded-xl text-white"
                                        >
                                            {message.text}
                                        </p>
                                    )}
                                </>
                            )
                        })}
                    </div>
                    <div className="flex gap-2">
                        <input
                            onInput={(e) => setMessage(e.currentTarget.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage(message)
                                    setMessage("")
                                }
                            }}
                            value={message}
                            type="text"
                            placeholder="Send message"
                            className="w-full border border-gray-300 px-2 rounded-md"
                        />
                        <button
                            onClick={() => sendMessage(message)}
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
