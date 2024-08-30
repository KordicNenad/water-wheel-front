import React, { useState, useEffect } from 'react';
import Footer from '../Components/footer';
import NavBar from '../Components/navBar';
import MoviesReel from '../Components/movieReel';
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";


const Home = () => {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "0px",
        slidesToShow: 3,
        speed: 500
    };

    const navigate = useNavigate();


    const [popularM, setPopularM] = useState([]);



    useEffect(() => {
        // Fetch data from your API
        fetch('https://biblioteka.mastiloviczoran.com/api/movie?genre=12')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                // Assuming data.data[1] contains the movies list
                const moviesList = data.data; // The second element contains the movies
                setPopularM(moviesList);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <header>
                <NavBar curPage={0}/>



                <div className="mx-5 mt-4 mb-5">
                    {popularM ? <div>
                            <div className="slider-container">
                                <Slider {...settings}>

                                    {popularM.map(movie => (
                                            <div key={movie.id}
                                                 style={{border: "1px solid #ddd", margin: "10px", padding: "10px"}}
                                                 className="d-flex me-2 hover-pointer"
                                                 onClick={() => {navigate(`/movie/${movie.id}`)}}
                                            >
                                                <div
                                                    className="container-card inside-shadow text-start m-2 rounded-2 overflow-hidden"
                                                    style={{
                                                        backgroundImage: `url('https://image.tmdb.org/t/p/w300${movie.poster_path}')`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        width: '400px', /* Set appropriate width */
                                                        height: '450px' /* Set appropriate height */
                                                        /* Add other styling properties as needed */
                                                    }}>

                                                    <div
                                                        className="card-bottom-left d-flex flex-column align-items-start justify-content-start">
                                                        <h3 className="fw-bold">{movie.title}</h3>
                                                        <div className="d-flex">
                                                            {movie.genres?.slice(0, 2).map((genre, index) => (
                                                                <div className="me-2 fs-6"
                                                                     key={index}>{genre.title}</div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="card-top-right fw-bold fs-6">
                                                        <p>{movie.adult ? '18+' : ''}</p>
                                                    </div>
                                                </div>
                                            </div>



                                            ))}
                                        </Slider>
                                        </div>
                                        </div>
                                        : null}


                            </div>
                        </header>


                        <main>
                            <MoviesReel alt="Movies"/>
                        </main>

                        <footer>
                        <Footer/>
                        </footer>
                        </div>
                        );
                    }

                    export default Home;
