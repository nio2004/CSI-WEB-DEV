import React from "react";


const Header =({handleToggleDarkmode}) => {
    return(
        <div className="header">
            <h1>Notes</h1>
            <button 
                onClick={()=>handleToggleDarkmode(
                    (previousDarkMode) => !previousDarkMode)}
                className="save">Toggle Mode</button>
        </div>
    )
}

export default Header