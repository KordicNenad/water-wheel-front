import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Movie from "./Pages/Movie";
import AllMovies from "./Pages/AllMovies";
import Profile from "./Pages/Profile";
import Favorite from "./Pages/Favorite";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
<div className="overflow-hidden" >
    <ToastContainer />
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/allMovies/:id" element={<AllMovies />} />
            <Route path="/allMovies/" element={<AllMovies />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Favorite" element={<Favorite />} />
        </Routes>
    </BrowserRouter>

</div>

  );
}

export default App;
