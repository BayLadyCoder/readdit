import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

const initialUseFetchParameters = {
  url: undefined,
  dataHandler: undefined,
  options: {},
  immediate: true,
};

export const useFetch = ({
  url: defaultUrl,
  dataHandler: defaultDataHandler,
  options: defaultOptions = {},
  immediate = true,
} = initialUseFetchParameters) => {
  const [data, setData] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.user.token);

  const fetchData = useCallback(
    async (
      {
        url = defaultUrl,
        options = defaultOptions,
        dataHandler = defaultDataHandler,
      } = {
        url: defaultUrl,
        options: defaultOptions,
        dataHandler: defaultDataHandler,
      }
    ) => {
      if (!url) {
        console.error('URL is required for useFetch');
        return {};
      }

      setIsError(false);
      setIsLoading(true);
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}`, ...options.headers },
          ...options,
        });

        const data = await res.json();

        if (res.status >= 400) {
          setIsError(true);
          setError(data.message);
          throw new Error(data.message);
        }

        dataHandler ? dataHandler(data) : setData(data);
      } catch (error) {
        console.error({ error });
        setIsError(true);
        setError(error);
      }
      setIsLoading(false);
    },
    [defaultUrl, defaultDataHandler, defaultOptions, immediate]
  );

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, []);

  return { data, isLoading, isError, error, fetchData };
};
