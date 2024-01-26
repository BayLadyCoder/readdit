import { useState, useEffect } from 'react';

export const useFetch = (url, options) => {
  if (!url) {
    console.error('url is required for useFetch');
    return {};
  }

  const [data, setData] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        setIsError(true);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, isError, error };
};
