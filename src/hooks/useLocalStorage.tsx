import { useState } from "react";

export default function useLocalStorage(key: string) {
  const [state, setState] = useState(
    localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key) as string)
      : null
  );

  const setStateWithStore = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  };

  return [state, setStateWithStore];
}
