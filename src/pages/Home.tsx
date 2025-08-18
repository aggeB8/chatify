import { Link } from "react-router"

const Home = () => {
    return (
        <div className="flex gap-4">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Home
