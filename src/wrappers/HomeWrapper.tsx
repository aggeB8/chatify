import { Outlet } from "react-router"

const HomeWrapper = () => {
    return (
        <div className="flex h-dvh w-dvw items-center justify-center">
            <Outlet />
        </div>
    )
}

export default HomeWrapper
