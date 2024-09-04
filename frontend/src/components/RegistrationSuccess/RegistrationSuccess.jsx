import Header from "../Shared/Header.jsx";
import Hero from "../Shared/Hero.jsx";
import {Link} from "react-router-dom";


const RegistrationSuccess = () => {
    return (
        <>
            <Header/>
            <div className="bg-custom-dark text-custom-light p-20 min-h-screen ">
                <Hero/>
                <h1 className="text-center text-lg mb-8">Registration Successful</h1>
                <div className="flex flex-col items-center">

                    <p>Thank you for registering!</p>
                    <p>We have sent a confirmation code to your email</p>
                    <p>johnsmith@gmail.com</p>

                    <Link to="/registration/validation">
                        <button className="btn mt-8">Continue</button>
                    </Link>
                </div>
            </div>
        </>

    )

}

export default RegistrationSuccess