import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";

const Movie = () => {
    const { id } = useParams();
    const [movieData, setMovieData] = useState(null);

    useEffect(() => {
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
                setMovieData(data.data);
                console.log(data.data)
            } catch (error) {
                console.error('Error fetching the movie data:', error);
            }
        };

        fetchMovie();
    }, []);


    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center w-100">
            <div className="w-50 p-3 shadow rounded-lg rounded-4 p-4">
                {movieData ? (
                    <div>
                        <h1>{movieData.title}</h1>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Movie;
