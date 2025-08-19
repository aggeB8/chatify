import { atom } from "jotai"

type ConversationsAtomType = {
    invitesReceived: string[]
    invitesSent: string[]
    participating: string[]
}

const conversationsAtom = atom<ConversationsAtomType>({
    invitesReceived: [],
    invitesSent: [],
    participating: []
})

export default conversationsAtom
