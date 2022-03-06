import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>; // void -> não tem retorno
};

// ReactNode = tipo do elemento react de return; é importado do react
type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType); // () -> formato da informação

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  // busca dados do usuário já logado
  useEffect(() => {
    // onAuthStateChanged -> event listener; deve ser descadastrado depois
    const unsubscribe = auth.onAuthStateChanged((user) => {
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

    // retorno de função que descadastra event listeners cadastrados
    return () => {
      unsubscribe();
    };
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

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
