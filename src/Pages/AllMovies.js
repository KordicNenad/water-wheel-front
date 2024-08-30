import React, { useState, useEffect } from 'react';
import Footer from '../Components/footer';
import NavBar from '../Components/navBar';
import { Link, useParams } from 'react-router-dom';
import { BsArrowRightSquareFill } from "react-icons/bs";

const AllMovies = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [movieCount, setMovieCount] = useState(50);
    const [enableLoad, setEnableLoad] = useState(false);
    const [genre, setGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState([]);

    const fetchMovies = async () => {
        try {
            const endpoint = id
                ? `https://biblioteka.mastiloviczoran.com/api/movie?paginate=${movieCount}&title=${id}&${selectedGenre.length > 0 ? `genre=${selectedGenre.join(',')}` : ''}`
                : `https://biblioteka.mastiloviczoran.com/api/movie?paginate=${movieCount}&${selectedGenre.length > 0 ? `genre=${selectedGenre.join(',')}` : ''}`;

            const response = await fetch(endpoint);
            const data = await response.json();
            const moviesList = data.data;
            setMovies(moviesList);

            // Enable loading more movies if the number of movies returned equals the count requested
            setEnableLoad(moviesList.length === movieCount);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchGenre = async () => {
        try {
            const response = await fetch('https://biblioteka.mastiloviczoran.com/api/genre');
            const data = await response.json();
            setGenre(data.data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
        fetchGenre();
    }, [id, movieCount, selectedGenre]);

    const loadMore = () => {
        setMovieCount(prevCount => prevCount + 25);
    };

    const toggleGenre = (id) => {
        setSelectedGenre(prevSelectedGenre => {
            if (prevSelectedGenre.includes(id)) {
                return prevSelectedGenre.filter(genreId => genreId !== id);
            } else {
                return [...prevSelectedGenre, id];
            }
        });
        setMovieCount(50); // Reset the movie count when genre changes
    };

    return (
        <div>
            <header>
                <NavBar curPage={1}/>
                <div className="mb-3 pb-5 mt-4 ps-5 ms-3">
                    <div className="d-flex fs-1 fw-bold ms-4 align-items-center">
                        <BsArrowRightSquareFill className="me-3" /> Movie Genre
                    </div>
                    {genre.length > 0 ? (
                        <div className="ms-3 mt-2">
                            {genre.map((g) => (
                                <button
                                    className={`m-1 border-0 p-2 px-3 fs-5 rounded-2 ${selectedGenre.includes(g.id) ? 'bg-primary' : 'bg-dark-subtle'}`}
                                    key={g.id}
                                    onClick={() => toggleGenre(g.id)}
                                >
                                    {g.title}
                                </button>
                            ))}
                        </div>
                    ) : null}
                </div>
            </header>

            <main>
                {movies.length > 0 ? (
                    <ul className="d-flex flex-wrap ps-5 ms-3">
                        {movies.map((movie) => (
                            <div key={movie.id} className="m-2">
                                <Link className="d-flex" to={`/movie/${movie.id}`}>
                                    <div className="container-card inside-shadow text-start rounded-2 overflow-hidden">
                                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                                        <div className="card-bottom-left d-flex flex-column align-items-start justify-content-start">
                                            <h3 className="fw-bold">{movie.title}</h3>
                                            <div className="d-flex">
                                                {movie.genres?.slice(0, 2).map((genre, index) => (
                                                    <div className="me-2 fs-6" key={index}>{genre.title}</div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="card-top-right fw-bold fs-6">
                                            <p>{movie.adult ? '18+' : ''}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center fs-5 my-5">LOADING...</div>
                )}

                {enableLoad && (
                    <div className="text-center mb-5 mt-3">
                        <button className="border-0 bg-primary rounded-2 w-25 fs-4 fw-semibold py-2" onClick={loadMore}>Load More</button>
                    </div>
                )}
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default AllMovies;
