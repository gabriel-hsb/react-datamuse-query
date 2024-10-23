import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchOptions } from './api/api.js';

import Button from './ui/Button.jsx';

import useFetchData from './api/fetchData.jsx';

function App() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({
    option: '',
    word: '',
  });

  const [searchedWord, setSearchedWord] = useState('');
  const [wordOption, setWordOption] = useState('');

  const { isLoading, error, fetchedWords, request, setError } = useFetchData();
  const lastFetchedValues = useRef({ wordOption, searchedWord });

  // *** END HOOKS DECLARATIONS ***

  // on page refresh, gets url params and fetchs again
  useEffect(() => {
    const searchParamsWord = searchParams.get('word');
    const searchParamsOption = searchParams.get('option');

    if (searchParamsWord && searchParamsOption) {
      setSearchedWord(searchParamsWord);
      setWordOption(searchParamsOption);
      request(searchParamsOption, searchParamsWord);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // compares if last searched word is the same
    // as the current word user wants to search
    if (
      lastFetchedValues.current.wordOption === wordOption &&
      lastFetchedValues.current.searchedWord === searchedWord
    ) {
      alert('Word already searched. Not Fetched.');
      return;
    }

    lastFetchedValues.current = { wordOption, searchedWord };

    fetchData(wordOption, searchedWord);
  };

  const fetchData = (option, word) => {
    setSearchParams(
      (prev) => {
        prev.set('option', option);
        prev.set('word', word);
        return prev;
      },
      { replace: true },
    );

    setWordOption(option);
    setSearchedWord(word);

    request(option, word);
  };

  const handleWordClick = (clickedWord) => {
    setSearchParams(
      (prev) => {
        prev.set('option', wordOption);
        prev.set('word', clickedWord);
        return prev;
      },
      { replace: true },
    );

    fetchData(searchParams.get('option'), clickedWord);
  };

  const handleReset = () => {
    setError(null);

    setWordOption('');
    setSearchedWord('');

    navigate('/');
    setSearchParams(
      (prev) => {
        prev.delete('option');
        prev.delete('word');
        return prev;
      },
      { replace: true },
    );
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
            className="bg-zinc-400/20 rounded-md py-2 px-4 border"
            minLength={2}
            required
            id="word"
            value={searchedWord}
            type="text"
            onChange={(e) => setSearchedWord(e.target.value)}
          />
        </div>

        <div className="flex gap-4 mt mb-4">
          {Object.values(fetchOptions).map(({ description, key }) => (
            <div key={key} className="flex items-center">
              <input
                className="w-4 h-4"
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
        <Button type="submit" disabled={isLoading || error}>
          {isLoading ? 'Loading...' : 'Search Words'}
        </Button>
      </form>

      {error && (
        <div>
          {error}
          <Button onClick={handleReset} type="button">
            Restart
          </Button>
        </div>
      )}

      {fetchedWords && fetchedWords.length > 0 && (
        <div>
          <ul className="grid grid-cols-3 gap-x-12 gap-y-1 text-start">
            {fetchedWords.map((res, idx) => (
              <li
                className="cursor-pointer border-b w-fit hover:border-blue-500 px-1 pt-1 hover:text-brown-text/30"
                key={idx}
              >
                <button
                  type="button"
                  className="w-fit"
                  onClick={() => handleWordClick(res.word)}
                >
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
