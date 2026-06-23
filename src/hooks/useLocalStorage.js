// src/hooks/useLocalStorage.js
import { useState, useEffect } from "react";

/**
 * Persists state to localStorage under `key`.
 * Falls back to `initialValue` if nothing is stored or parsing fails.
 */
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`useLocalStorage: failed to read key "${key}"`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`useLocalStorage: failed to write key "${key}"`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
