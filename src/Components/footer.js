
import React, {useState} from 'react';

const Footer = () => {
    const [openBurger, setOpenBurger] = useState(false)

    return (
        <footer className='w-full footer'>
            <img
                src="https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg"
                class="slika "
                alt=""
            />
            <p>WaterWheel © 2024. All Rights Reserved</p>
        </footer>
    );
};

export default Footer;
