import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: Cancel the timeout if value changes again before the delay
    return () => { clearTimeout(handler) };
  }, [value, delay]); // Rerun effect if value or delay changes

  return debouncedValue;
}

export default useDebounce;

