import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import defaultavatar from "../../assets/avatar.svg";
import {AxiosPanelista} from "../../axios/Axios.jsx";
import OrganizerProfileCard from "./OrganizerProfileCard.jsx";

const OrganizerProfileId = () => {
    const {organizerId} = useParams();
    const token = useSelector((state) => state.user.accessToken);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await AxiosPanelista.get(`/organizers/edit/${organizerId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const user = response.data;
                setProfile({
                    firstName: user.user.first_name,
                    lastName: user.user.last_name,
                    email: user.user.email,
                    experience: user.experience,
                    phone: user.phone,
                    company: user.company,
                    picture: user.picture || defaultavatar,
                });
                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setLoading(false);
            }
        };
        fetchUser();
    }, [token, organizerId]);

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    if (!profile) {
        return <div className="text-white">Failed to load profile</div>;
    }

    return (
        <OrganizerProfileCard
            profile={profile}
        />
    );
}

export default OrganizerProfileId;

