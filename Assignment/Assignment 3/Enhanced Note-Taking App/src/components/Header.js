import React from "react";

const Header = ({ handleToggleDarkMode }) => {
    return (
        <div>
            <div className="subheader">
                <h2>Welcome to Enhanced Note Taking Application</h2>
            </div>
            <div className="header">
                <h1>Notes</h1>
                <button 
                    onClick={() => 
                        handleToggleDarkMode(
                            (previousDarkMode) => !previousDarkMode
                        ) 
                    }
                    className="mode">Change Mode
                </button>
            </div>
        </div>
    );
};

export default Header;
