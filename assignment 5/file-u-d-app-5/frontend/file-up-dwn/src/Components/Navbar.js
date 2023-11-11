import React from 'react';
import { useAuth } from '../Contexts/AuthContext';

const Navbar = () => {
    const { isLoggedIn, logout, username } = useAuth();

    const logOutClick = async (e) => {
        e.preventDefault();
        logout();
    }

    return (
        <div>
            <nav>
                <ul>
                    {isLoggedIn ? (
                        <>
                            <h1>Welcome, {username}</h1>
                            <li>Logged in <button onClick={logOutClick}>logout</button></li>
                        </>
                    ) : (
                        <li>Not logged in</li>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
