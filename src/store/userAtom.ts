import { atom } from "jotai"

type UserAtomType = {
    jwtToken: string
    csrfToken: string
    user: string
    email: string
    avatar: string
    id: number | null
}

const userAtom = atom<UserAtomType>({
    jwtToken: "",
    csrfToken: "",
    user: "",
    email: "",
    avatar: "",
    id: null
})

export default userAtom
