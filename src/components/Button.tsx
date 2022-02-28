import { useState } from "react";

// props = propriedades recebidas como argumentos
export function Button() {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  return <button onClick={increment}>{counter}</button>;
}
