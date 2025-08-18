import { useAtomValue } from "jotai"
import userAtom from "../store/userAtom"
import { useEffect } from "react"

const Chat = () => {
    const userValue = useAtomValue(userAtom)

    useEffect(() => {
        console.log(userValue)
    })

    return <div>Chat</div>
}

export default Chat
