import { Footer } from "../../shared/components/footer";
import { Header } from "../../shared/components/header";
import { BoardContent, Sidebar } from "./components";
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
