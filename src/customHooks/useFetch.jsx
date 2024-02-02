import { useState, useEffect } from 'react';

export const useFetch = (url, options, shouldFetch = true) => {
  if (!url) {
    console.error('url is required for useFetch');
    return {};
  }

  const [data, setData] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (shouldFetch) {
      setIsLoading(true);
      fetch(url, options)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => {
          setIsError(true);
          setError(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  return { data, isLoading, isError, error };
};
