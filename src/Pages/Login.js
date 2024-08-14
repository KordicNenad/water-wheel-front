import { useState } from 'react';
import { toast } from "react-toastify";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
    };

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password) => {
        return password.length >= 8; // Basic check for password length
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEmailValid(email)) {
            handleError("Invalid email format!");
            return;
        }

        if (!isPasswordValid(password)) {
            handleError("Password must be at least 8 characters long!");
            return;
        }

        const loginData = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('https://biblioteka.mastiloviczoran.com/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || `Error: ${response.statusText}`;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('Login successful', data);

            // Store user data in localStorage
            localStorage.setItem("_name", data.user.name);
            localStorage.setItem("_id", data.user.id);
            localStorage.setItem("_auth", data.token);

            toast.success("Login successful!");
            navigate('/'); // Redirect to a dashboard or home page

        } catch (err) {
            console.error('Login failed', err);
            toast.error(`Login failed: ${err.message}`);
            handleError(err.message);
        }
    };

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center w-100">
            <div className="w-50 p-3 shadow rounded-lg rounded-4 p-4">
                <form onSubmit={handleSubmit} className="w-100">
                    <div onClick={() => {navigate('/')}} className="hover-pointer text-decoration-underline fs-5 mb-2 no-outline">← Back</div>
                    <h1 className="fs-1 fw-semibold text-nowrap pb-4">Account Log in</h1>

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

                    <div className="fw-semibold mt-2 mb-3">Don't have an account yet? <Link to="/Register">Sign Up</Link></div>

                    <div>
                        <button type="submit" className="border-0 bg-primary rounded-2 w-100 fs-4 fw-semibold py-2 mt-4">Log In</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
