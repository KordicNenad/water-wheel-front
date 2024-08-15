import React, { useState, useEffect } from 'react';
import { BsArrowRightSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const MovieReel = ({ genre }) => {
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState('');

    useEffect(() => {
        console.log(genre);

        // Fetch data from your API
        fetch(`https://biblioteka.mastiloviczoran.com/api/genre/${genre}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const moviesList = data.data[1]; // The second element contains the movies
                const genreN = data.data[0].title; // The first element contains the genre name
                setMovies(moviesList);
                setGenreName(genreN);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [genre]); // Depend on genre so that data updates when genre changes

    return (
        <div>
            <div className="fs-3 fw-bold ms-4 justify-content-center align-items-center">
                <BsArrowRightSquareFill /> {genreName}
            </div>
            <div>
                <ul className="d-flex">
                    {movies.map((movie) => (
                        <Link className="d-flex" key={movie.id} to={`/movie/${movie.id}`} onClick={() => { console.log(movie.id) }}>
                            <div className="container-card inside-shadow text-start m-2 rounded-2 overflow-hidden">
                                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                                <div className="card-bottom-left d-flex flex-column align-items-start justify-content-start">
                                    <h3 className="fw-bold">{movie.title} </h3>
                                    <div className="d-flex">
                                        {movie.genres.slice(0, 2).map((genre, index) => (
                                            <div className="me-2 fs-6" key={index}>{genre.title}</div>
                                            ))}
                                    </div>
                                </div>
                                <div className="card-top-right fw-bold fs-6">
                                    <p>{movie.adult ? '18+' : ''}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MovieReel;
