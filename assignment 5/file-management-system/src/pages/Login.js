import React from "react";
import "./login-styles.css";

function Login() {
    return (
        <div className="login">
            <div className="div">
                <div className="overlap">
                    <div className="text-wrapper">SafeDrive</div>
                    <img className="humaaans-space"  />
                </div>
                <div className="text-wrapper-2">Welcome back!</div>
                <div className="overlap-group">
                    <div className="group">
                        <div className="group-2">
                            <input
                                type="text"
                                className="input-box" // Add the class for styling input boxes
                                placeholder="Enter your email or username"
                            />
                        </div>
                        <div className="group-3">
                            <input
                                type="password"
                                className="input-box" // Add the class for styling input boxes
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="overlap-group-wrapper">
                            
                                <button className="login-button">Log in</button> {/* Add the button */}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
