import { useState } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { SearchResultsList } from './components/SearchResultsList';
import { ResultCard } from './components/ResultCard';

function App() {

  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  return (
    <div className='App'>
      <div className='search-bar-container'>
        <SearchBar setResults={setResults}/>
        <SearchResultsList results = {results} onSelect = {setSelectedResult}/>
        <ResultCard result = {selectedResult} />
      </div>
    </div>
  )
}

export default App
