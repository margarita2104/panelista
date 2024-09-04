import Header from "../Shared/Header.jsx";
import Hero from "../Shared/Hero.jsx";
import {Link} from "react-router-dom";


const JoinAsASpeaker = () => {
    return (
        <>
            <Header/>
            <div className="bg-custom-dark text-custom-light p-20 min-h-screen ">
                < Hero/>
                <Link to="Registration/Speaker"></Link>
            </div>
        </>
    )
}

export default JoinAsASpeaker

