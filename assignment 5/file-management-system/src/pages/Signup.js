import React from "react";
import "./signup-styles.css";

function Signup() {
    return (
        <div className="signup">
            <div className="div">
                <div className="overlap">
                    <div className="text-wrapper">SafeDrive</div>
                    <img className="humaaans-space" src="login_image.png" />
                </div>
                <div className="text-wrapper-2">Let’s get started!</div>
                <div className="group">
                    <div className="group-2">
                        <input type="text" className="input-box" placeholder="Email"></input>
                    </div>
                    <div className="group-3">
                        <input type="text" className="input-box" placeholder="Name" />
                    </div>
                    <div className="group-4">
                        <input type="password" className="input-box" placeholder="Password" />
                    </div>
                    <div className="group-5">
                        <input type="password" className="input-box" placeholder="Confirm password" />
                    </div>
                </div>
                <div className="overlap-group-wrapper">
                    <button className="signup-button">Sign up</button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
