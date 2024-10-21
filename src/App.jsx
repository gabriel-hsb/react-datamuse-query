import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchOptions } from './api/api.js';

import Button from './ui/Button.jsx';

import useFetchData from './api/fetchData.jsx';

function App() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams({
    word: '',
    option: '',
  });
  const searchedWord = searchParams.get('word');
  const wordOption = searchParams.get('option');

  const [fetchedOptionDisplay, setFetchedOptionDisplay] = useState('');
  const [fetchedOptionTempDisplay, setFetchedOptionTempDisplay] = useState('');

  const [searchedWordDisplay, setSearchedWordDisplay] = useState('');

  const { isLoading, error, response, request, setError } = useFetchData({
    searchedWord,
    wordOption,
  });

  // *** END HOOKS DECLARATIONS ***

  const handleFormSubmit = (e) => {
    e.preventDefault();
    request({ wordOption, searchedWord });
    setFetchedOptionDisplay(fetchedOptionTempDisplay);
    setSearchedWordDisplay(searchedWord);
  };

  const handleWordClick = (word) => {
    setSearchParams(
      (prev) => {
        prev.set('word', word);
        return prev;
      },
      { replace: true },
    );
    setSearchedWordDisplay(word);
    setFetchedOptionDisplay(fetchedOptionTempDisplay);
    setSearchedWordDisplay(searchedWord);
  };

  useEffect(() => {
    if (searchedWord && wordOption) {
      request({ wordOption, searchedWord });
      setFetchedOptionDisplay(fetchedOptionTempDisplay);
      setSearchedWordDisplay(searchedWord);
    }
  }, [searchedWord, wordOption, fetchedOptionTempDisplay, request]);

  const handleReset = () => {
    setError(false);
    navigate('/');
    setSearchParams(
      (prev) => {
        prev.set('option', '');
        prev.set('word', '');
        return prev;
      },
      { replace: true },
    );
    setSearchedWordDisplay('');
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
            onChange={(e) =>
              setSearchParams(
                (prev) => {
                  prev.set('word', e.target.value);
                  return prev;
                },
                { replace: true },
              )
            }
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
                onChange={(e) =>
                  setSearchParams(
                    (prev) => {
                      prev.set('option', e.target.value);
                      setFetchedOptionTempDisplay(description);
                      return prev;
                    },
                    { replace: true },
                  )
                }
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

        <Button type="submit" disabled={isLoading || error}>
          {error || (isLoading ? 'Loading...' : 'Search Words')}
        </Button>
      </form>

      {error && (
        <>
          {error}
          <Button onClick={handleReset} type="button">
            Restart
          </Button>
        </>
      )}

      {response && response.length > 0 && (
        <div>
          <p className="text-center mb-4">
            There are <b>{response.length}</b>{' '}
            {response.length > 1 ? 'words' : 'word'} that{' '}
            <b>
              {fetchedOptionDisplay.toLowerCase()} {searchedWordDisplay}
            </b>
          </p>
          <ul className="grid grid-cols-3 gap-x-12 text-start">
            {response.map((res, idx) => (
              <li
                className="cursor-pointer border-b max-w-full hover:border-blue-500"
                key={idx}
              >
                <button type="button" onClick={() => handleWordClick(res.word)}>
                  {res.word}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default App;
