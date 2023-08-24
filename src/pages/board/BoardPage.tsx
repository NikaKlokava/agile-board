import { BoardContent, Footer, Header, Sidebar } from "./components";
import cl from "./board.module.css";

export const BoardPage = () => {
  return (
    <div className={cl.board}>
      <Header />
      <Sidebar />
      <BoardContent />
      <Footer />
    </div>
  );
};
