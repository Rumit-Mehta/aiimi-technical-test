import { useState } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { SearchResultsList } from './components/SearchResultsList';
import { ResultCard } from './components/ResultCard';
import { NewUserBar } from './components/NewUserBar';
import { NewUserForm } from './components/NewUserForm';

function App() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedResults, setSelectedResults] = useState([]);
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const handleSelect = (user) => {
  setSelectedResults(prev => {
    // if user already exists, do nothing
    if (prev.some(u => u.id === user.id)) {
      return prev;
    }
    // otherwise add to list
    return [...prev, user];
  });
};


  return (
    <div className='App'>
      <div className='search-bar-container'>
        <SearchBar setResults={setResults} setQuery={setQuery} />
        <SearchResultsList results={results} onSelect={handleSelect} query={query} />
        <div className="result-cards">
          {selectedResults.map((user, index) => (
            <ResultCard key={`${user.id ?? "user"}-${index}`} result={user} />
          ))}
        </div>
        <NewUserForm
          isOpen={isNewUserOpen}
          onClose={() => setIsNewUserOpen(false)}
        />
        <NewUserBar onNewUser={() => setIsNewUserOpen(true)} /> 
    </div>
  </div>
  )
}

export default App
