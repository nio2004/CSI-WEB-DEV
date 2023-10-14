import React from "react";
import { MdSearch } from "react-icons/md";

const Search = ({handleSearchNote}) => {
    return <div className="search">
        <MdSearch className="serach-icons" size="1.3rem" />
        <input onChange={(event)=>handleSearchNote(event.target.value)} 
            type="text" 
            placeholder="Type to Search....."></input>
    </div>
}

export default Search;