import React from 'react';

import { fetchOptions } from '../functions/api/api';
import Button from '../ui/Button';

const Form = ({
  handleFormSubmit,
  searchedWord,
  setSearchedWord,
  setWordOption,
  wordOption,
  isLoading,
  error,
}) => (
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

    <div className="flex gap-4 mt-1 mb-4">
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
);

export default Form;
