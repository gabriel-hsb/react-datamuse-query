import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchOptions } from './api/api.js';

import Button from './ui/Button.jsx';

import useFetchData from './api/fetchData.jsx';

function App() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({
    word: '',
    option: '',
  });

  
  const [searchedWord, setSearchedWord] = useState('');
  const [wordOption, setWordOption] = useState('');
  
  const { isLoading, error, response, request, setError } = useFetchData();
  const lastFetchedValues = useRef({wordOption, searchedWord})

  // *** END HOOKS DECLARATIONS ***

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // compares if last searched word is the same
    // as the current word user wants to search
    if (
      lastFetchedValues.current.wordOption === wordOption &&
      lastFetchedValues.current.searchedWord === searchedWord
    ) {
      alert("Word already searched. Not Fetched.");
      return;
    }

    lastFetchedValues.current = { wordOption, searchedWord };

    fetchData()
  };

  const fetchData = () => {
    setSearchParams(
      (prev) => {
        prev.set('option', wordOption);
        prev.set('word', searchedWord);
        return prev;
      },
      { replace: true },
    );

    request( wordOption, searchedWord );
  }
  
  useEffect(() => {
    const searchParamsWord = searchParams.get('word')
    const searchParamsOption = searchParams.get('option')
    
    if(searchParamsWord && searchParamsOption) {
      setSearchedWord(searchParamsWord)
      setWordOption(searchParamsOption)
      request( searchParamsOption, searchParamsWord );
    }
  }, [])

  const handleWordClick = (clickedWord) => {
    setSearchedWord(clickedWord)

    setTimeout(() => {
      fetchData()
    }, 200);
  }

  //TODO: handle Reset funcion
  const handleReset = () => {
    setError(false);
    navigate('/');
    // setSearchParams(
    //   (prev) => {
    //     prev.delete('option', '');
    //     prev.delete('word', '');
    //     return prev;
    //   },
    //   { replace: true },
    // );
  };

  return (
    <section className="p-5 max-w-[1200px] my-0 mx-auto min-h-screen flex flex-col items-center gap-6">
      <div className="flex flex-col items-center">
        <h1 className="font-sans text-4xl">Datamuse API</h1>
        <p className="italic"> A word-finding query engine </p>
      </div>

      <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="word">Which word do you want to search?</label>
          <input
            className="bg-zinc-400/20 rounded-none py-2 px-4 border"
            minLength={2}
            required
            id="word"
            value={searchedWord}
            type="text"
            onChange={(e) => setSearchedWord(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          {Object.values(fetchOptions).map(({ description, key }) => (
            <div key={key} className="flex items-center">
              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                required
                type="radio"
                value={key}
                name="fetchOptions"
                id={key}
                onChange={(e) => {
                  setWordOption(e.target.value);
                }}
                checked={wordOption === key}
              />
              <label
                className="ms-2 text-sm font-medium text-gray-900 "
                htmlFor={key}
              >
                {description}
              </label>
            </div>
          ))}
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Search Words'}
        </Button>
      </form>

          
      {/*
        {error && (
          <div>
            {error}
            <Button onClick={handleReset} type="button">
              Restart
            </Button>
          </div>
        )}    
      */}

      {response && response.length > 0 && (
        <div>
          <p className="text-center mb-4">
            There are <b>{response.length}</b>{' '}
            {response.length > 1 ? 'words' : 'word'} that{' '}
            <b>
              {/* {fetchedOptionDisplay.toLowerCase()} {searchedWordToDisplay} */}
            </b>
          </p>
          <ul className="grid grid-cols-3 gap-x-12 text-start">
            {response.map((res, idx) => (
              <li
                className="cursor-pointer border-b max-w-full hover:border-blue-500"
                key={idx}
              >
                <button type="button" onClick={() => handleWordClick(res.word)}>{res.word}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default App;
