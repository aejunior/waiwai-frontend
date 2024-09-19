import { useEffect, useState } from 'react';

export type SetAction<T> = (value: T) => void;

export default function useSessionStorage<T>(key: string, initialValue: T): [T, SetAction<T>] {
  const [value, setValue] = useState<T>(initialValue);

  const readValue = (): T => {
    const sessionStorageValue = sessionStorage.getItem(key);

    return sessionStorageValue ? (JSON.parse(sessionStorageValue ?? '') as T) : initialValue;
  };

  const setSessionStorageValue = (value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  useEffect(() => {
    setValue(readValue());
    
  }, []);

  return [value, setSessionStorageValue];
}
