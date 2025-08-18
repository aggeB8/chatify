import { atom } from "jotai"

type UserAtomType = {
    csrfToken: string
    userData: {
        user: string
        email: string
        avatar: string
        id: number
    } | null
}

const userAtom = atom<UserAtomType>({ csrfToken: "", userData: null })

export default userAtom
