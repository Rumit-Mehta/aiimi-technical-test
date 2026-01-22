import { useState } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { SearchResultsList } from './components/SearchResultsList';
import { ResultCard } from './components/ResultCard';

function App() {

  const [results, setResults] = useState([]);
  const [selectedResults, setSelectedResults] = useState([]);
  const handleSelect = (user) => {
  setSelectedResults(prev => {
    // if user already exists, do nothing
    if (prev.some(u => u.id === user.id)) {
      return prev;
    }
    // otherwise add it
    return [...prev, user];
  });
};


  return (
    <div className='App'>
      <div className='search-bar-container'>
        <SearchBar setResults={setResults} />
        <SearchResultsList results={results} onSelect={handleSelect} />
        <div className="result-cards">
          {selectedResults.map((user, index) => (
            <ResultCard key={`${user.id ?? "user"}-${index}`} result={user} />
          ))}
        </div>
    </div>
  </div>
  )
}

export default App
