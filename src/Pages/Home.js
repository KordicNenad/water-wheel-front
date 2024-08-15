import React, { useState, useEffect } from 'react';
import Footer from '../Components/footer';
import NavBar from '../Components/navBar';
import MoviesReel from '../Components/movieReel';

const Home = () => {
    const [popularM, setPopularM] = useState([]);

    useEffect(() => {
        // Fetch data from your API
        fetch('https://biblioteka.mastiloviczoran.com/api/genre/12')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                // Assuming data.data[1] contains the movies list
                const moviesList = data.data[1]; // The second element contains the movies
                setPopularM(moviesList);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <header>
                <NavBar />

                <div className="my-5 text-center fs-1 fw-bolder py-5 bg-dark-subtle">Big Sliding Cards Of Movies</div>
            </header>



            <main>
               <MoviesReel genre={"12"} alt="Adventure"/>
               <MoviesReel genre={"14"} alt="Adventure"/>
               <MoviesReel genre={"16"} alt="Adventure"/>
               <MoviesReel genre={"27"} alt="Adventure"/>
            </main>

            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default Home;
