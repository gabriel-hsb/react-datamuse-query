import { useSearchParams } from 'react-router-dom';
import { fetchOptions } from './api/api.js';
import useFetchData from './api/fetchData.jsx';

function App() {
    const [searchParams, setSearchParams] = useSearchParams({
        word: '',
        option: '',
    });

    const searchedWord = searchParams.get('word');
    const wordOption = searchParams.get('option');

    const { isLoading, error, response, request } = useFetchData({
        searchedWord,
        wordOption,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        request({ wordOption, searchedWord });
    };

    return (
        <section className="p-5 max-w-[1200px] my-0 mx-auto min-h-screen flex flex-col items-center">
            <div>
                <h1 className="font-sans text-4xl">Datamuse API</h1>
                <p> A word-finding query engine </p>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    minLength={2}
                    required
                    value={searchedWord}
                    className="bg-gray-500 rounded-none"
                    type="text"
                    onChange={(e) =>
                        setSearchParams((prev) => {
                            prev.set('word', e.target.value);
                            return prev;
                        })
                    }
                />

                {Object.values(fetchOptions).map(({ description, key }) => (
                    <div key={key}>
                        <input
                            required
                            type="radio"
                            value={key}
                            name="fetchOptions"
                            id={key}
                            onChange={(e) =>
                                setSearchParams((prev) => {
                                    prev.set('option', e.target.value);
                                    return prev;
                                })
                            }
                            checked={wordOption === key}
                        />
                        <label htmlFor={key}>{description}</label>
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={isLoading || error}
                    className="bg-zinc-200 p-3 rounded-xl border hover:bg-slate-500 transition-all font-mono disabled:cursor-default disabled:bg-red-400"
                >
                    {isLoading ? 'Loading...' : 'Fetch Data'}
                </button>
            </form>

            {error && error}

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
