import { useReducer, useEffect } from "react";

function initializer(key, initialValue) {
  const storedValue = JSON.parse(localStorage.getItem(key));

  return storedValue ? storedValue : initialValue;
}

export function useLocalStorage(key, reducer, initialValue = {}) {
  const [value, dispatch] = useReducer(reducer, initializer(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, dispatch];
}
