import React, { useRef, useState } from "react";
import "./SearchBar.css";

export const SearchBar = ({ setResults, setQuery }) => {
  const [input, setInput] = useState("");
  const debounceRef = useRef(null);

  const fetchData = async (value) => {
    const q = value.trim();

    if (q.length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/users?q=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search failed", err);
      setResults([]);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchData(value);
    }, 300);
  };

  return (
    <div className="input-wrapper">
      <input
        className="search-input"
        placeholder="Search for a user..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button
        className="search-button"
        type="button"
        onClick={() => fetchData(input)}
      >
        Go!
      </button>
    </div>
  );
};