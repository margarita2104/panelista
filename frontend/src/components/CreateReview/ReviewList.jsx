const ReviewList = ({reviews}) => {
    return (
        <div>
            <h2>Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id} className="review">
                        <p><strong>Rating:</strong> {review.rating}</p>
                        <p><strong>Content:</strong> {review.content}</p>
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
};

export default ReviewList;
