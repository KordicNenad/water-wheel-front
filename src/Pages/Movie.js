import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import StarRating from "../Components/starRating";
import { FaStar } from "react-icons/fa";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";

const Movie = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);
    const [releaseDate, setReleaseDate] = useState();
    const [newComment, setNewComment] = useState("");
    const [isFavorite, setIsFavorite] = useState();

    const authToken = localStorage.getItem('_auth');


    const FavoriteMovie = async () => {
        try {

            const response = await fetch(  `https://biblioteka.mastiloviczoran.com/api/movie/${id}/watch-later`, {
                method: "POST",
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response)
            const data = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {

        const fetchFavorites = async () => {
            try {
                const response = await fetch(`https://biblioteka.mastiloviczoran.com/api/watch-later?paginate=100`, {
                    method: "GET",
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                const moviesList = data.data;
                const theMovId = id;
                console.log(theMovId);

                const extractIds = (data) => {
                    return data.map(item => item.id);
                };
                const ids = extractIds(moviesList);

                const isIdInList = (idList, idToCheck) => {
                    return idList.includes(idToCheck);
                };

                const check = isIdInList(ids, theMovId); // Corrected line

                setIsFavorite(check);
                console.log(check);
                console.log(ids);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://biblioteka.mastiloviczoran.com/api/movie/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data)
                setMovie(data.data);
                setReleaseDate(data.data.release_date.slice(0, 4));
            } catch (error) {
                console.error('Error fetching the movie data:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch(`https://biblioteka.mastiloviczoran.com/api/movie/${id}/comment`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data)
                setComments(data.data);
            } catch (error) {
                console.error('Error fetching the comments:', error);
            }
        };

        fetchComments();
        fetchMovie();
        fetchFavorites()
    }, [id]);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        console.log("test")
        event.preventDefault();
        const authToken = localStorage.getItem("_auth");

        try {
            console.log("tr")
            const response = await fetch(`https://biblioteka.mastiloviczoran.com/api/movie/${id}/comment?comment=${encodeURIComponent(newComment)}`, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                }
            });

            console.log(response)

            if (response.ok) {
                const updatedComments = [...comments, { comment: newComment }]; // Assuming the API returns the new comment
                setComments(updatedComments);
                setNewComment(""); // Clear the comment input
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error posting the comment:', error);
        }
    };

    return (
        <div className="container pt-5 pb-5 d-flex align-items-center justify-content-center w-100 d-flex flex-column">
            <div className="w-75 p-3 shadow rounded-lg rounded-4 p-4">
                <div onClick={() => navigate(-1)} className="hover-pointer text-decoration-underline fs-5 mb-2 no-outline">← Back</div>
                {movie ? (
                    <div>
                        <div className="d-flex">
                            <div className="me-4">
                                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                     alt={movie.title}/>
                            </div>
                            <div>
                                <div className="d-flex align-content-center align-items-center justify-content-between">
                                    <div className="">
                                        <div
                                            className="d-flex fw-bold fs-2 align-content-center align-items-center">{movie.title}</div>

                                    </div>
                                    <div><StarRating initial={movie.vote_average} movieID={movie.id}
                                                     voteCount={movie.vote_count}/></div>
                                </div>
                                <div className="mb-3  d-flex align-content-center align-items-center">{releaseDate}
                                    <FaStar
                                        className="ms-2 me-1"/> 3.2
                                </div>
                                <div>
                                    {movie.overview}
                                </div>
                                <div className="d-flex flex-column mt-3">
                                    <div className="d-flex align-content-center align-items-center">
                                        <BsArrowRightSquareFill/>
                                        <div className="ms-2 fw-bold me-2">Genre:</div>
                                        {movie.genres?.map((genre, index) => (
                                            <div className="me-2 fs-6" key={index}>{genre.title}</div>
                                        ))}
                                    </div>
                                    <div className="d-flex align-content-center align-items-center">
                                        <BsArrowRightSquareFill/>
                                        <div className="ms-2 fw-bold me-2">Relese Date:</div>
                                        {movie.release_date}
                                    </div>

                                    <div className="d-flex align-content-center align-items-center">
                                        <BsArrowRightSquareFill/>
                                        <div className="ms-2 fw-bold me-2">Actors:</div>
                                        {movie.genres?.map((genre, index) => (
                                            <div className="me-2 fs-6" key={index}>{genre.title}</div>
                                        ))}
                                    </div>
                                    <div className="fs-3" onClick={() => {FavoriteMovie()}}><MdFavoriteBorder /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            <div className="w-75 p-3 shadow rounded-lg rounded-4 p-4 mt-4">
                <div>
                    <form className="d-flex flex-column w-100 align-items-center justify-content-center"
                          onSubmit={handleCommentSubmit}>
                        <textarea
                            placeholder="Join the discussion"
                            className="w-100 px-2 pb-5 border-0 py-2 shadow-sm text-start opacity-50 text-wrap"
                            rows="4"
                            value={newComment}
                            onChange={handleCommentChange}
                        ></textarea>

                        <div className="mb-3 d-flex w-100 text-end justify-content-end">
                            <button className="border-0 bg-primary rounded-2 w-25 fs-6 fw-semibold py-2 mt-2"
                                    type="submit">Post
                            </button>
                        </div>
                    </form>


                    <div>
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div key={index}>
                                    <div className="mb-4 border-bottom">
                                        <div className="d-flex align-items-center">
                                            <div className="fw-bolder fs-4">{comment.user_name}</div>
                                            <div className="fs-6 ms-3 fw-lighter"><IoTimeOutline className="mb-1"/> {comment.created_at.slice(2,10)}</div>
                                        </div>
                                        <div className="ms-4 mt-1 fw-semibold"> {comment.comment}</div>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <div>No comments yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movie;