import React, { useState, useEffect } from 'react';
import Footer from '../Components/footer';
import NavBar from '../Components/navBar';

const AllMovies = () => {
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
            </header>



            <main>

            </main>

            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default AllMovies;
