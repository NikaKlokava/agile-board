import { BoardContent, Footer, Header } from "./components";
import cl from "./board.module.css";
import { useEffect } from "react";
import { fetchBoards, fetchTasks } from "../../redux/thunk/fetchDataThunk";
import { useAppDispatch } from "../../redux/hooks/hook";

export const BoardPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBoards());
    dispatch(fetchTasks());
  }, [dispatch]);

  const isLoading = false;

  return (
    <div className={cl.board}>
      <Header />
      <BoardContent isLoading={isLoading} />
      <Footer />
    </div>
  );
};
