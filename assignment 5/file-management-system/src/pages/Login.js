import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./login-styles.css";
import { signIn } from '../services/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await signIn(email, password);
        navigate('/dashboard'); // Redirect to the dashboard upon successful login
      } catch (error) {
        console.error('Login error:', error.message);
      }
    }
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
                                className="input-box" 
                                placeholder="Enter your email or username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="group-3">
                            <input
                                type="password"
                                className="input-box" 
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
