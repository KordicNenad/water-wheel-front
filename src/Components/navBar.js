
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation links
import { ReactComponent as WaterWheel } from '../Assets/Brand/waterwheel.svg';
import { CgMenuLeft } from "react-icons/cg";
import { CgClose } from "react-icons/cg";

const NavBar = ({curPage}) => {
    const [openBurger, setOpenBurger] = useState(false)

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate to the search results page with the query as a URL parameter or a query string
        navigate(`/allmovies/${encodeURIComponent(query)}`);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container-fluid">




               <div className="collapse navbar-collapse " id="navbarNav">


                   {openBurger ? <CgClose size={45} onClick={()=>{setOpenBurger(false)}} className="hover-pointer"/> : <CgMenuLeft size={45} onClick={()=>{setOpenBurger(true)}} className="hover-pointer me-2" />}

                   <Link className="navbar-brand fw-bolder ms-3 user-select-none" to="/"> <WaterWheel width={50} height={50} /> WaterWheel</Link>
                   <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                       <span className="navbar-toggler-icon"></span>
                   </button>



                   {openBurger ? <div className="collapse navbar-collapse" id="navbarNav">
                       <ul className="navbar-nav">
                           <li className="nav-item">
                               <Link className={`nav-link ${curPage === 0 ? 'active' : ''}`} to="/">Home</Link>
                           </li>
                           <li className="nav-item">
                               <Link className={`nav-link ${curPage === 1 ? 'active' : ''}`} to="/allmovies">All
                                   Movies</Link>
                           </li>
                           <li className="nav-item">
                               <Link className={`nav-link ${curPage === 2 ? 'active' : ''}`}
                                     to="/favorite">Favorite</Link>
                           </li>

                       </ul>
                   </div> : <div className="d-flex w-100 align-items-center justify-content-center align-items-center ">
                       <form onSubmit={handleSubmit}
                             className="d-flex w-100 align-items-center justify-content-center align-items-center ">
                           <input
                               type="text"
                               placeholder="Search Movies..."
                               className="w-50 border-0 rounded-4 py-2 shadow-sm text-center opacity-50"
                               value={query}
                               onChange={(e) => setQuery(e.target.value)}
                           />
                           <button type="submit" style={{display: 'none'}}>Submit</button>
                       </form>
                   </div>}


                   {localStorage.getItem("_auth") ?
                       <Link className="nav-link fw-bold align-items-center text-nowrap fs-5" aria-current="page"
                             to="/profile">Hello, {localStorage.getItem("_name")} →</Link>

                       :

                       <Link className="nav-link fw-bold align-items-center text-nowrap fs-5" aria-current="page"
                             to="/register">Register →</Link>
                   }
                    </div>



            </div>
        </nav>
    );
};

export default NavBar;
