import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { auth, firebase } from "./services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>; // void -> não tem retorno
};

export const AuthContext = createContext({} as AuthContextType); // () -> formato da informação

// tudo que está dentro do provider consegue enxergar o 'value' do contexto
function App() {
  const [user, setUser] = useState<User>();

  // busca dados do usuário já logado
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });
  }, []);

  async function signInWithGoogle() {
    // autenticação com google
    const provider = new firebase.auth.GoogleAuthProvider();

    // esperar autenticação
    const result = await auth.signInWithPopup(provider);

    // se autenticação retornar usuário
    if (result.user) {
      // guardar nome, foto e id
      const { displayName, photoURL, uid } = result.user;

      // se sem nome e sem foto -> erro
      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account");
      }

      // salvar info do usuário
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  // todas as páginas dentro de AuthContext podem receber valor do 'user' (dados) e 'sign in' (qualquer página pode fazer log in)
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
