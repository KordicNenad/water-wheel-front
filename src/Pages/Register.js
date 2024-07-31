import { useState } from 'react';
import { toast } from "react-toastify";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import {
    Link,
    useNavigate
} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleError = (error) => {
        toast.warn(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username.length < 3) {
            handleError("Username must be at least 3 characters long!");
            return;
        }

        if (!isEmailValid(email)) {
            handleError("Invalid email format!");
            return;
        }

        if (!isPasswordValid(password)) {
            handleError("Password must be at least 8 characters long, contain at least one number and one uppercase letter!");
            return;
        }

        if (password !== confirmPassword) {
            handleError("The passwords do not match!");
            return;
        }

        // If all validations pass
        console.log(username, email, password);
    }

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center w-100">
            <div className="w-50 p-3 shadow rounded-lg rounded-4 p-4">
                <form onSubmit={handleSubmit} className="w-100">
                    <div onClick={() => {navigate('/')}} className="hover-pointer text-decoration-underline fs-5 mb-2 no-outline">← Back</div>
                    <h1 className="fs-1 fw-semibold text-nowrap pb-4">Account Sign Up</h1>

                    <div className="d-flex flex-column align-items-start pb-3">
                        <label className="text-secondary fw-semibold fs-5 pb-2">Username*</label>
                        <input
                            className="border-0 d-block w-100 text-secondary fw-semibold p-2 rounded-2"
                            inputMode="text"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>

                    <div className="d-flex flex-column align-items-start pb-3">
                        <label className="text-secondary fw-semibold fs-5 pb-2">Email*</label>
                        <input
                            className="border-0 d-block w-100 text-secondary fw-semibold p-2 rounded-2"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>

                    <div className="d-flex flex-column align-items-start pb-3 position-relative">
                        <label className="text-secondary fw-semibold fs-5 pb-2">Password*</label>
                        <input
                            className="border-0 d-block w-100 text-secondary fw-semibold p-2 rounded-2"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="position-absolute top-50 end-0 mt-2 translate-middle-y border-0 bg-transparent text-secondary"
                            style={{ right: '10px' }}
                        >
                            {showPassword ? <IoEye size="1.5em"/> : <IoEyeOff size="1.5em"/>}
                        </button>
                    </div>

                    <div className="d-flex flex-column align-items-start pb-3 position-relative ">
                        <label className="text-secondary fw-semibold fs-5 pb-2">Re-enter Password*</label>
                        <input
                            className="border-0 d-block w-100 text-secondary fw-semibold p-2 rounded-2"
                            type={showPassword ? "text" : "password"}
                            placeholder="Re-enter Password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="position-absolute top-50 mt-2 end-0 translate-middle-y border-0 bg-transparent text-secondary"
                            style={{ right: '10px' }}
                        >
                            {showPassword ? <IoEye size="1.5em"/> : <IoEyeOff size="1.5em"/>}
                        </button>
                    </div>

                    <div className="fw-semibold mt-2 mb-3">Already have account? <Link to="/Login">Sign In</Link></div>

                    <div>
                        <button type="submit" className="border-0 bg-primary rounded-2 w-100 fs-4 fw-semibold py-2 mt-4">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
