import React from "react";


const Profile = () => {


    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center w-100">
            <div className="w-50 p-3 shadow rounded-lg rounded-4 p-4">
                <div className="my-3 text-center fs-4 fw-bolder py-2 bg-dark-subtle">Change name button</div>
                <div className="my-3 text-center fs-4 fw-bolder py-2 bg-dark-subtle">Change password button</div>
                <div className="my-3 text-center fs-4 fw-bolder py-2 bg-dark-subtle">Logout Button</div>
                <div className="my-3 text-center fs-4 fw-bolder py-2 bg-dark-subtle">Delete Account Button</div>
            </div>
        </div>
    );
}

export default Profile;
