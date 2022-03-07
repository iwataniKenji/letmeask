import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from './useAuth';

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");

  // observar sala e atualizar dados quando mudados
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    // once -> ouve evento uma vez / on -> ouve evento quando mudar
    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
          };
        }
      );

      // muda state do título
      setTitle(databaseRoom.title);

      // muda state da questão
      setQuestions(parsedQuestions);
    });

    return () => {
      // remove o listener ativado com 'on'
      roomRef.off('value');
    }
  }, [roomId, user?.id]);

  return {
    questions,
    title,
  };
}
