import React, { useState } from "react";
import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa";

const StarRating = ({ initial = 3.5, movieID, voteCount }) => {
    const [initRating, setInitRating] = useState(initial);
    const [rating, setRating] = useState(initRating);

    const authToken = localStorage.getItem("_auth");
    const MovieIdString = movieID.toString();

    const rateMovie = (rating) => {
        setInitRating(rating);

        const sentRating = async () => {
            console.log(movieID, MovieIdString);
            try {
                const response = await fetch(`https://biblioteka.mastiloviczoran.com/api/movie/${MovieIdString}/rate?rate=${rating}`, {
                    method: "POST",
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching the movie data:', error);
            }
        };

        sentRating();
    };

    return (
        <div>
            <div className="fs-2 d-flex hover-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                    <div
                        key={star}
                        onMouseEnter={() => setRating(star)}
                        onMouseLeave={() => setRating(initRating)}
                        onClick={() => rateMovie(star)}
                    >
                        {rating <= star - 1 ? <FaRegStar /> : null}
                        {rating > star - 1 && rating < star ? <FaStarHalfAlt /> : null}
                        {rating >= star ? <FaStar /> : null}
                    </div>
                ))}
            </div>

            <div className="d-flex text-center justify-content-center">
                {voteCount ? voteCount : 0} {/* Corrected this line */}
                <div className="ms-2">Votes</div>
            </div>
        </div>
    );
};

export default StarRating;