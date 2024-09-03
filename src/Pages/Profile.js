import React from "react";
import {useNavigate} from 'react-router-dom';
import { FaUser } from "react-icons/fa";


const Profile = () => {
    const navigate = useNavigate();

    const logOut = async (event) => {

        const authToken = localStorage.getItem("_auth");

        try {
            console.log("tr")
            const response = await fetch(`https://biblioteka.mastiloviczoran.com/api/logout`, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                }
            });

            console.log(response)

            if (response.ok) {
                localStorage.removeItem("_name");
                localStorage.removeItem("_id");
                localStorage.removeItem("_auth");

                navigate('/');
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error posting the comment:', error);
        }
    }


    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center w-100">
            <div className="w-50 p-3 shadow rounded-lg rounded-4 p-4">
                <div onClick={() => navigate(-1)}
                     className="hover-pointer text-decoration-underline fs-5 mb-2 no-outline">← Back
                </div>

                <div className="text-center">
                    <div ><FaUser size={90}/></div>
<div className="mt-2 fs-3 fw-bold">{localStorage.getItem("_name")}</div>
                </div>
                <div className="mt-5 text-center">
                    <button className="border-0 rounded-2 bg-dark-subtle fw-bold py-2 px-3 fs-4 text-danger" onClick={() => {logOut()}}>Logout of Account</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
