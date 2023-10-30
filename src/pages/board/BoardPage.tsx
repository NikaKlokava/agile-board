import { BoardContent, Footer, Header } from "./components";
import cl from "./board.module.css";
import { useEffect } from "react";
import { fetchBoards } from "../../redux/thunk/fetchDataThunk";
import { useAppDispatch } from "../../redux/hooks/hook";
import { awaitUserTasksData } from "../../redux/reducers/tasksSlice";

export const BoardPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBoards());
    dispatch(awaitUserTasksData());
  }, [dispatch]);

  return (
    <div className={cl.board}>
      <Header />
      <BoardContent />
      <Footer />
    </div>
  );
};
