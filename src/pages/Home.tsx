import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { auth, firebase } from "../services/firebase";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";

import { TestContext } from "../App";

import "../styles/auth.scss";

export function Home() {
  const history = useNavigate();

  // value -> valor do contexto
  // setValue -> possibilita modificar o valor
  const { value, setValue } = useContext(TestContext);

  function handleCreateRoom() {
    const provider = new firebase.auth.GoogleAuthProvider(); // autenticação com google

    auth.signInWithPopup(provider).then((result) => {
      // depois de logar
      console.log(result);

      // redirecionamento
      history("/rooms/new");
    });
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <h1>{value}</h1>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <img src={googleIconImg} alt="Logo do Google" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
