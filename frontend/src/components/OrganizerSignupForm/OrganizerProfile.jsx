import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {AxiosPanelista} from "../../axios/Axios.jsx";
import OrganizerProfileCard from "./OrganizerProfileCard.jsx";
import {useNavigate} from "react-router-dom";
import defaultavatar from "../../assets/avatar.svg";


const OrganizerProfile = () => {
    const token = useSelector((state) => state.user.accessToken);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await AxiosPanelista.get('/organizers/me/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const user = response.data[0];

                if (user && user.user) {


                    setProfile({
                        firstName: user.user.first_name,
                        lastName: user.user.last_name,
                        email: user.user.email,
                        phone: user.phone,
                        experience: user.experience,
                        picture: user.picture || defaultavatar,
                        company: user.company,
                    });
                } else {
                    console.error("user data is incomplete or undefined");
                    setProfile(null);
                }
                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setLoading(false);
            }
        };
        fetchUser();
    }, [token]);

    const handleEdit = () => {
        navigate('/organizersignup', {state: {initialData: profile}});
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your profile")) {
            try {
                const response = await AxiosPanelista.delete('/organizers/edit/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 204) {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error deleting profile:', error);
            }
        }
    };

    const handleCreateEvent = () => {
        navigate('/createevent');
    };

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    if (!profile) {
        return <div className="text-white">Failed to load profile</div>;
    }

    return (<OrganizerProfileCard
        profile={profile}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreateEvent={handleCreateEvent}/>);
};

export default OrganizerProfile;