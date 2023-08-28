import { BoardContent, Footer, Header } from "./components";
import cl from "./board.module.css";

export const BoardPage = () => {
  return (
    <div className={cl.board}>
      <Header />
      <BoardContent />
      <Footer />
    </div>
  );
};
