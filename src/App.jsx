import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Form from './components/Form.jsx';
import WordsList from './components/wordsList.jsx';

import Button from './ui/Button.jsx';

import useFetchData from './functions/api/fetchData.jsx';

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

    window.scrollTo('0', '0')
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

      <Form
        handleFormSubmit={handleFormSubmit}
        searchedWord={searchedWord}
        setSearchedWord={setSearchedWord}
        setWordOption={setWordOption}
        wordOption={wordOption}
        isLoading={isLoading}
        error={error}
      />

      {error && (
        <div>
          {error}
          <Button onClick={handleReset} type="button">
            Restart
          </Button>
        </div>
      )}

      {fetchedWords && fetchedWords.length > 0 && (
        <WordsList
          fetchedWords={fetchedWords}
          handleWordClick={handleWordClick}
        />
      )}
    </section>
  );
}

export default App;
