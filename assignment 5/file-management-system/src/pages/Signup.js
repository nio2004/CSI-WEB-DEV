import React, { useState } from "react";
import "./signup-styles.css";
import { navigate } from 'react-router-dom';
import { signUp } from '../services/auth';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = navigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
          }
        try{
            await signUp(email, password);
            navigate('/dashboard');
        }catch (error) {
            console.error('Signup error:', error.message);
          }
    }
    return (
        <div className="signup">
            <div className="div">
                <div className="overlap">
                    <div className="text-wrapper">SafeDrive</div>
                    <img className="humaaans-space" src="login_image.png" />
                </div>
                <div className="text-wrapper-2">Let’s get started!</div>
                <div className="group">
                <form onSubmit={handleSignup}>
                    <div className="group-2">
                        <input type="text" className="input-box" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className="group-4">
                        <input type="password" className="input-box" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="group-5">
                        <input type="password" className="input-box" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                    <div className="overlap-group-wrapper">
                    <button className="signup-button" type="submit">Sign up</button>
                    </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
}

export default Signup;
