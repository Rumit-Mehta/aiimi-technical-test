import React from "react";
import "./SearchResult.css"

export const SearchResult = ({ result, onSelect }) => {
    return <div 
            className="search-result" 
            onClick={() => onSelect(result)}
            >
            {result.first_name} {result.last_name}
        </div>
};