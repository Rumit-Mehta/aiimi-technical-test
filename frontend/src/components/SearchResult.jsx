import React from "react";
import "./SearchResult.css"

export const SearchResult = ({ result, onSelect, query }) => {
  const fullName = `${result.first_name} ${result.last_name}`;
  const q = (query || "").trim().toLowerCase();

  const i = q ? fullName.toLowerCase().indexOf(q) : -1;

  if (i === -1) {
    return (
      <div className="search-result" onClick={() => onSelect(result)}>
        {fullName}
      </div>
    );
  }

  const before = fullName.slice(0, i);
  const match = fullName.slice(i, i + q.length);
  const after = fullName.slice(i + q.length);

  return (
    <div className="search-result" onClick={() => onSelect(result)}>
      {before}
      <mark className="highlight">{match}</mark>
      {after}
    </div>
  );
};