import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showNotificationAlert } from '../reducers/notificationsSlice.js';

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
  const dispatch = useDispatch();

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
          ...options,
          headers: { Authorization: `Bearer ${token}`, ...options.headers },
        });

        const data = await res.json();

        if (res.status >= 400) {
          throw new Error(data.message);
        } else if (res.status >= 500) {
          throw new Error('Server error!');
        }

        dataHandler ? dataHandler(data) : setData(data);
      } catch (error) {
        console.error({ error });
        setIsError(true);
        setError(error);
        const messages = error.message
          .split('\n')
          .map((message) => ({ message, type: 'error' }));

        dispatch(showNotificationAlert(messages));
      }
      setIsLoading(false);
    },
    [defaultUrl, defaultDataHandler, defaultOptions, token, dispatch]
  );

  useEffect(() => {
    if (defaultUrl && immediate) {
      fetchData();
    }
  }, []);

  return { data, isLoading, isError, error, fetchData };
};
