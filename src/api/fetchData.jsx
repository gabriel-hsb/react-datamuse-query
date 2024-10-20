import { useState, useCallback } from 'react';
import { BASE_URL } from './api.js';

const useFetchData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const request = useCallback(async ({ wordOption, searchedWord }) => {
        setIsLoading(true);
        let res;
        let json;

        try {
            res = await fetch(
                `${BASE_URL}/words?${wordOption}=${searchedWord}`,
            );
            json = await res.json();

            if (!json || json.length === 0) {
                setError('Word not found');
            } else {
                setResponse(json);
            }
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setResponse(json);
            setIsLoading(false);
        }
    }, []);
    return {
        isLoading,
        error,
        response,
        request,
    };
};

export default useFetchData;
