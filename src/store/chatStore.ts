import { atom } from "jotai"

type MessagesType = {
    activeChat: string
    chatData: {
        id: string
        text: string
        createdAt: string
        userId: number
        conversationId: string
    }[]
} | null

const chatAtom = atom<MessagesType>(null)

export default chatAtom
