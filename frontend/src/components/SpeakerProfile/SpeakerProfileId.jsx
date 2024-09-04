import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {AxiosPanelista} from "../../axios/Axios.jsx";
import defaultavatar from "../../assets/avatar.svg";
import ProfileCard from "./ProfileCard.jsx";
import {useSelector} from "react-redux";

const SpeakerProfileId = () => {
    const {speakerId} = useParams()
    const token = useSelector((state) => state.user.accessToken)

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [linkedin, setLinkedin] = useState()
    const [website, setWebsite] = useState()
    const [topics, setTopics] = useState('');
    const [currentJobTitle, setCurrentJobTitle] = useState('');
    const [careerDescription, setCareerDescription] = useState('');
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [birthYear, setBirthYear] = useState('');
    const [professionalExperience, setProfessionalExperience] = useState('');
    const [culturalBackground, setCulturalBackground] = useState('');
    const [speakerExperience, setSpeakerExperience] = useState('');
    const [languages, setLanguages] = useState('');
    const [avatarSource, setAvatarSource] = useState('')
    const [willingnessToTravel, setWillingnessToTravel] = useState('');
    const [pronouns, setPronouns] = useState('');
    const [maxEventSize, setMaxEventSize] = useState('');
    const [generalAvailibility, setGeneralAvailibility] = useState('');
    const [contactPreferences, setContactPreferences] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [isOrganizer, setIsOrganizer] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            AxiosPanelista.get(`/speakers/edit/${speakerId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    let user = res.data
                    setFirstName(user.user.first_name)
                    setLastName(user.user.last_name)
                    setEmail(user.user.email)
                    setLinkedin(user.linkedin_profile)
                    setWebsite(user.website)
                    setTopics(user.topics)
                    setCurrentJobTitle(user.current_job_title)
                    setCulturalBackground(user.cultural_background)
                    setCareerDescription(user.career_description)
                    setCountry(user.country);
                    setCity(user.city);
                    setState(user.state);
                    setLanguages(user.languages)
                    setProfessionalExperience(user.professional_experience)
                    setSpeakerExperience(user.speaker_experience)
                    setAvatarSource(user.picture || defaultavatar)
                    setBirthYear(user.birth_year)
                    setWillingnessToTravel(user.willingness_to_travel)
                    setPronouns(user.pronouns)
                    setMaxEventSize(user.max_event_size)
                    setGeneralAvailibility(user.general_availability)
                    setContactPreferences(user.contact_preferences)
                    setAdditionalNotes(user.additional_notes)
                })
                .catch((error) => console.log(error.message))
        }
        fetchUser()
    }, [token]);

    useEffect(() => {
        const fetchUser = async () => {
            AxiosPanelista.get(`/user/me/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    console.log(res)
                    setIsOrganizer(res.data[0].is_organizer)
                })
                .catch((error) => console.log(error.message))
        }
        fetchUser()
    }, [token]);

    return (
        <>
            <ProfileCard
                avatarSource={avatarSource}
                email={email}
                linkedin={linkedin}
                website={website}
                firstName={firstName}
                lastName={lastName}
                currentJobTitle={currentJobTitle}
                culturalBackground={culturalBackground}
                careerDescription={careerDescription}
                topics={topics}
                country={country}
                state={state}
                city={city}
                languages={languages}
                professionalExperience={professionalExperience}
                speakerExperience={speakerExperience}
                birthYear={birthYear}
                willingnessToTravel={willingnessToTravel}
                pronouns={pronouns}
                maxEventSize={maxEventSize}
                generalAvailibility={generalAvailibility}
                contactPreferences={contactPreferences}
                additionalNotes={additionalNotes}
                speakerId={speakerId}
                isOrganizer={isOrganizer}
            />
        </>)
}

export default SpeakerProfileId;