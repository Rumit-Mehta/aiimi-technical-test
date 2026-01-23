import React from "react";

import "./SearchResultsList.css"
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, onSelect, query }) => {
    return (
        <div className="results-list">
        {
            results.map((result, id) => {
                return <SearchResult result={result} onSelect={onSelect} query={query} />
            })
        }
        </div>

    )
};