import React, { useState } from 'react';
import { mockSearchResults } from '../constants/mock';
import { XIcon, SearchIcon } from '@heroicons/react/solid';
import SearchResults from './SearchResults';

const Search = () => {
    const [input, setInput] = useState('');
    const [bestMatches, setBestMatches] = useState(mockSearchResults.result);

    const clear = () => {
        setInput("");
        setBestMatches([]);
    };

    const updateBestMatches = () => {
        setBestMatches(mockSearchResults.result);
    };

  return (
    <div className='flexbox items-center my-4 border-2 rounded-md relative z-50 w-96 bg-white border-neutral-200'>
        <input type='text' value={input} className='w-full px-4 py-2 focus:outline-none rounded-md'
        placeholder='Search Stock'
        onChange={(event) => {
            setInput(event.target.value);
        }}
        onKeyPress={(event) => {
            if (event.key === "Enter") {
                updateBestMatches();
            }
        }}
        />

        {input && <button onClick={clear} className='m-1'>
            <XIcon className='h-4 w-4 fill-gray-500' />
        </button>}

        <button onClick={updateBestMatches} className='h-8 w-8 b-indigo-600 rounded-md flex justify-center items-center m-1 p-2'>
            <SearchIcon className='h-4 w-4 fill-black-100' />
        </button>

    {input && bestMatches.length > 0 ? <SearchResults results={bestMatches} /> : null}
    </div>
  )
}

export default Search