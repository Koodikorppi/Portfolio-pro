import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setIsLoading(true);
    setError(false)
    const requestAbortController = new AbortController();
    activeHttpRequests.current.push(requestAbortController);
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: requestAbortController.signal
      });

      const data = await response.json();
      activeHttpRequests.current = activeHttpRequests.current.filter(
        reqCtrl => reqCtrl !== requestAbortController
      );

      if (!response.ok) {
        throw {code: response.status, message: data.message}
      }
      setIsLoading(false);
      return data;

    } catch (err) {
      setError(true)
      setIsLoading(false);
      throw err;
    }
  }, []);

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortController => abortController.abort());
    }
  }, []);

  return {isLoading, error, sendRequest}
};
