import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {AxiosPanelista} from "../../axios/Axios.jsx";
import {add_review} from "../../store/slices/SpeakerSlice";
import ReviewList from "./ReviewList.jsx";
import Header from "../Shared/Header.jsx";
import Hero from "../Shared/Hero.jsx";

const CreateReview = () => {
    const {speakerId} = useParams();
    const navigate = useNavigate();
    const [speakerData, setSpeakerData] = useState({});
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({content: '', rating: ''});
    const [successMessage, setSuccessMessage] = useState('');
    const token = useSelector((state) => state.user.accessToken);
    const dispatch = useDispatch();

    const getSpeakerData = async () => {
        try {
            const response = await AxiosPanelista.get(`/speakers/edit/${speakerId}/`);
            setSpeakerData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('Error fetching speaker data:', error.response);
        }
    };

    useEffect(() => {
        getSpeakerData();
    }, [speakerId]);

    const fetchReviews = async () => {
        try {
            const res = await AxiosPanelista.get(`/speakers/${speakerId}/reviews/`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            setReviews(res.data);
            console.log(res.data);
        } catch (error) {
            console.log('Error fetching reviews:', error.message);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [speakerId, token]);

    const submitReviewHandler = async (e) => {
        e.preventDefault();
        if (newReview.content && newReview.rating && token) {
            try {
                const response = await AxiosPanelista.post(
                    `/speakers/${speakerId}/reviews/`,
                    {
                        content: newReview.content,
                        rating: newReview.rating,
                        speaker: speakerId,
                    },
                    {headers: {Authorization: `Bearer ${token}`}}
                );
                dispatch(add_review({speakerId, review: response.data}));
                setReviews([...reviews, response.data]);
                setNewReview({content: '', rating: ''});
                setSuccessMessage('Review submitted successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
                console.log("Review submitted successfully");
                navigate(`/speakers/${speakerId}`);
            } catch (error) {
                console.error("Error submitting review:", error);
            }
        } else {
            console.error("Review submission failed: Missing fields");
        }
    };

    const changeReviewHandler = (e) => {
        const {name, value} = e.target;
        setNewReview(prevReview => ({
            ...prevReview,
            [name]: value
        }));
    };

    return (
        <>
            <Header/>
            <Hero/>
            <div className="min-h-screen flex flex-col items-center">
                <ReviewList reviews={reviews}/>
                {successMessage && <div className="success-message">{successMessage}</div>}
                <form onSubmit={submitReviewHandler} className="mt-6 w-full">
                <textarea
                    name="content"
                    value={newReview.content}
                    onChange={changeReviewHandler}
                    placeholder="Write your review"
                    className="w-full p-2 border border-gray-300 rounded"
                />
                    <input
                        type="number"
                        name="rating"
                        value={newReview.rating}
                        onChange={changeReviewHandler}
                        placeholder="Rating (1-5)"
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                        min="1"
                        max="5"
                    />
                    <button type="submit" className="btn-primary text-blue-950 mt-2">Submit Review</button>
                </form>
            </div>
        </>
    );
};

export default CreateReview;
