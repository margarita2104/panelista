import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUpEmail from "../components/Registration/Registration.jsx";
import SignUpForm from "../components/RegistrationValidation/RegistrationValidation.jsx";
import HomePage from "../components/Home/Home.jsx";
import AboutPage from "../components/About/About.jsx";
import RegistrationSuccess from "../components/RegistrationSuccess/RegistrationSuccess.jsx";
import Login from "../components/Login/Login.jsx";
import SpeakerSignUpForm from "../components/SpeakerSignupForm/Index.jsx";
import EventsAll from "../components/EventsAll/EventsAll.jsx";
import OrganizerSignupForm from "../components/OrganizerSignupForm/index.jsx";
import OrganizerProfile from "../components/OrganizerSignupForm/OrganizerProfile.jsx";
import CreateEvent from "../components/CreateEvent/CreateEvent.jsx";
import EventPageId from "../components/EventPage/EventPageId.jsx";
import SpeakerProfile from "../components/SpeakerProfile/SpeakerProfile.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import SpeakersAll from "../components/SpeakersAll/SpeakersAll.jsx";
import SpeakerProfileId from "../components/SpeakerProfile/SpeakerProfileId.jsx";
import Join from "../components/Join/Join.jsx";
import DocsBotComponent from "../components/Docsbot/Index.jsx";
import NotFound from "../components/NotFound/NotFound.jsx";
import CreateReview from "../components/CreateReview/CreateReview.jsx";


const PageRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/speakers" element={<SpeakersAll/>}/>
                <Route path="/docsbot" element={<DocsBotComponent/>}/>
                <Route path="/events" element={<EventsAll/>}/>

                <Route path="/login" element={<Login/>}/>
                <Route path="/join" element={<Join/>}/>

                <Route path="/registration/speaker" element={<SignUpEmail/>}/>
                <Route path="/registration/organizer" element={<SignUpEmail/>}/>
                <Route path="/registration/success" element={<RegistrationSuccess/>}/>
                <Route path="/registration/validation" element={<SignUpForm/>}/>

                <Route path="/createevent" element={<CreateEvent/>}/>
                <Route path="/events/:eventId" element={<EventPageId/>}/>

                <Route path="*" element={<NotFound/>}/>

                <Route element={<ProtectedRoutes/>}>
                    <Route path="/speakersignup" element={<SpeakerSignUpForm/>}/>
                    <Route path="/speakers/:speakerId" element={<SpeakerProfileId/>}/>
                    <Route path="/speaker/profile/me" element={<SpeakerProfile/>}/>

                    <Route path="/organizersignup" element={<OrganizerSignupForm/>}/>
                    <Route path="/organizer/profile/me" element={<OrganizerProfile/>}/>

                    <Route path="/createreviews/:speakerId" element={<CreateReview/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default PageRoutes;
