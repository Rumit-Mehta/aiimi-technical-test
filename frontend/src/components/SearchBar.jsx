import React from 'react'
import "./SearchBar.css"

export const SearchBar = () => {
    return(
        <div className='input-wrapper'>
            <input className='search-input' placeholder='Search for a user...'/>
            <button className='search-button'>Go!</button>
        </div>

    )
}