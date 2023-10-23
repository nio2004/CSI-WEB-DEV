import React from "react";
import "./homepage-styles.css";
import { useNavigate } from "react-router-dom";

function Homepage() {
    const navigate = useNavigate(); 
    const handleSignupClick = () => {
        // Use the navigate function to go to the Signup route
        navigate('/signup');
      };

    const handleLoginClick = () => {
        // Use the navigate function to go to the Signup route
        navigate('/login');
      };
    return (
        <div className="homepage">
            <div className="div">
                <div className="overlap">
                    <p className="text-wrapper">A safe place for your important files.</p>
                    <div className="overlap-2">
                        <button className="rectangle signup-button" onClick={handleSignupClick}>Sign up</button>
                        <img className="homepage-image" />
                    </div>
                        <button className="rectangle login-button" onClick={handleLoginClick}>Log in</button>
                </div>
                <div className="navbar">
                    <div className="storage-version">
                        Storage&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Version Control&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Security
                    </div>
                    <div className="text-wrapper-4">SafeDrive</div>
                    <div className="overlap-group-wrapper">
                        <button className="nav-signup" onClick={handleSignupClick}>Sign up</button>
                    </div>
                    <img className="line" />
                </div>
            </div>
        </div>
    );
};

export default Homepage;
