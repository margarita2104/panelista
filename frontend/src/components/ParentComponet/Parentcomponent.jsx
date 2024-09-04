import React from 'react';
import { useParams } from 'react-router-dom';
import CreateReview from "../CreateReview/CreateReview.jsx";


const ParentComponent = () => {
  const { eventId, speakerId } = useParams();

  return (
    <CreateReview
      eventId={eventId}
      speakerId={speakerId}
      ReviewSubmitted={(data) => console.log('Review submitted:', data)}
    />
  );
};

export default ParentComponent;
