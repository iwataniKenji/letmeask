import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { AuthContextProvider } from "./contexts/AuthContext";

// tudo que está dentro do provider consegue enxergar o 'value' do contexto
function App() {
  // todas as páginas dentro de AuthContext podem receber valor do 'user' (dados) e 'sign in' (qualquer página pode fazer log in)
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
