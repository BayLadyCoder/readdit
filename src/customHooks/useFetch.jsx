import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

export const useFetch = ({
  url,
  dataHandler,
  options = {},
  immediate = true,
}) => {
  if (!url) {
    console.error('url is required for useFetch');
    return {};
  }

  const [data, setData] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.user.token);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchData = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const res = await fetch(url, { headers, ...options });
      const data = await res.json();
      dataHandler ? dataHandler(data) : setData(data);
    } catch (error) {
      setIsError(true);
      setError(err);
    }
    setIsLoading(false);
  }, [url, dataHandler, options, immediate]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, []);

  return { data, isLoading, isError, error, fetchData };
};
