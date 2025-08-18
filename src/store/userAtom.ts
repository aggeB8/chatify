import { atom } from "jotai"

const userAtom = atom({
    csrfToken: "",
    username: "",
    email: "",
    avatar: ""
})

export default userAtom
