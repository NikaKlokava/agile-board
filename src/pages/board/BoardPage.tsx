import { BoardContent, Footer, Header } from "./components";
import cl from "./board.module.css";
import { useData } from "../../shared/hooks/useData";

export const BoardPage = () => {
  const { isLoading } = useData();
  return (
    <div className={cl.board}>
      <Header />
      <BoardContent isLoading={isLoading} />
      <Footer />
    </div>
  );
};
