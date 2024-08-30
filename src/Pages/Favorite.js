
import Footer from '../Components/footer';
import NavBar from '../Components/navBar';
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

const Favorite = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [movieCount, setMovieCount] = useState(50);
    const [enableLoad, setEnableLoad] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState([]);

    const authToken = localStorage.getItem('_auth');

    const fetchMovies = async () => {
        try {

            const response = await fetch(  `https://biblioteka.mastiloviczoran.com/api/watch-later?paginate=50`, {
                method: "GET",
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            const moviesList = data.data;
            setMovies(moviesList);

            // Enable loading more movies if the number of movies returned equals the count requested
            setEnableLoad(moviesList.length === movieCount);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    useEffect(() => {
        fetchMovies();
    }, []);


    return (
        <div>
            <header>
                <NavBar curPage={2}/>
            </header>


            <main>
                {movies.length > 0 ? (
                    <ul className="d-flex flex-wrap ps-5 ms-3">
                        {movies.map((movie) => (
                            <div key={movie.id} className="m-2">
                                <Link className="d-flex" to={`/movie/${movie.id}`}>
                                    <div className="container-card inside-shadow text-start rounded-2 overflow-hidden">
                                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                             alt={movie.title}/>
                                        <div
                                            className="card-bottom-left d-flex flex-column align-items-start justify-content-start">
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


            </main>

            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default Favorite;
