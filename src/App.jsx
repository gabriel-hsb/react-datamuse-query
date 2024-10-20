import { useState } from 'react';
import { fetchOptions, BASE_URL } from './api/api.js';

function App() {
    const [searchedWord, setSearchedWord] = useState('');
    const [fetchOption, setFetchOption] = useState('');
    const [response, setResponse] = useState(undefined);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchData = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (searchedWord.length < 1) alert('Please type a longer word');

        try {
            const res = await fetch(
                `${BASE_URL}/words?${fetchOption}=${searchedWord}`,
            );
            const json = await res.json();
            setResponse(json);

            if (json.length === 0) {
                alert('Word not found.\n Please try again');
            }
        } catch (e) {
            console.error(`Erro: ${e}`);
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="p-5 max-w-[1200px] my-0 mx-auto min-h-screen flex flex-col items-center">
            <div>
                <h1 className="font-sans text-4xl">Datamuse API</h1>
                <p> A word-finding query engine </p>
            </div>
            <form onSubmit={(e) => fetchData(e)}>
                <input
                    required
                    value={searchedWord}
                    className="bg-gray-500 rounded-none"
                    type="text"
                    onChange={({ target }) => setSearchedWord(target.value)}
                />
                <p>Word State:{searchedWord}</p>

                {Object.values(fetchOptions).map(({ description, key }) => (
                    <div key={key}>
                        <input
                            minLength={2}
                            required
                            type="radio"
                            value={key}
                            name="fetchOptions"
                            id={key}
                            onChange={({ target }) =>
                                setFetchOption(target.value)
                            }
                            checked={fetchOption === key}
                        />
                        <label htmlFor={key}>{description}</label>
                    </div>
                ))}

                <p>Selected Radio Input = {fetchOption}</p>
                <button
                    type="submit"
                    disabled={isLoading || error}
                    className="bg-zinc-200 p-3 rounded-xl border hover:bg-slate-500 transition-all font-mono disabled:cursor-default disabled:bg-red-400"
                >
                    {isLoading ? 'Loading...' : 'Fetch Data'}
                </button>
            </form>
            {response && (
                <ul>
                    {response.map((res, idx) => (
                        <li key={idx}>{res.word}</li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default App;
