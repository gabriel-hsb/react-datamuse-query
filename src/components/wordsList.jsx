import React from 'react';

const WordsList = ({ fetchedWords, handleWordClick }) => (
  <section>
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
  </section>
);

export default WordsList;
