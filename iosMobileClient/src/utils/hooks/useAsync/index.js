import React, {useState, useEffect, useCallback} from 'react';

export const useAsync = (asyncFunction, status = true) => {
  const [pending, setPending] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [display, setDisplay] = useState(false);

  const execute = useCallback(() => {
    setPending(true);
    setValue(null);
    setError(null);
    setDisplay(prev => !prev);

    return asyncFunction()
      .then(response => setValue(response))
      .catch(error => setError(error))
      .finally(() => {
        setPending(false);
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (status) {
      execute();
    }
  }, [execute, status]);

  return {execute, pending, value, error, display};
};
