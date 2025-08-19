import { useEffect } from "react"
import { useLocation } from "react-router"
import log from "../utils/log"

export default function VisitLogger() {
    const location = useLocation()

    useEffect(() => {
        log.log(`User visited: ${location.pathname}`)
    }, [location])

    return null
}
