import { createContext, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

export const TestContext = createContext({} as any); // () -> formato da informação

// tudo que está dentro do provider consegue enxergar o 'value' do contexto
function App() {
  const [value, setValue] = useState("Teste");

  return (
    <BrowserRouter>
      <TestContext.Provider value={{ value, setValue }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </TestContext.Provider>
    </BrowserRouter>
  );
}

export default App;
