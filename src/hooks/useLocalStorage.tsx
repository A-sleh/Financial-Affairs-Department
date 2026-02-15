import { useState } from "react";

export default function useLocalStorage<T>(key: string): [T, (e: any) => void] {
  const [state, setState] = useState<T>(
    localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key) as string)
      : "",
  );

  const setStateWithStore = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  };

  return [state, setStateWithStore];
}
