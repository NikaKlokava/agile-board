import { child, get, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth, database } from "../../firebase";
import { addBoard } from "../../redux/reducers/boardsSlice";
import { addNewTask } from "../../redux/reducers/tasksSlice";

export const useData = () => {
  const [boardsData, setBoardsData] = useState<Boards>();
  const [tasksData, setTasksData] = useState<Tasks>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    get(child(ref(database), "users/" + auth.currentUser?.uid + "/boards"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const res = snapshot.val();
          const data: Boards = Object.values(res);
          const sortData = data.sort((a, b) => {
            if (a.time && b.time) {
              return a.time - b.time;
            }
            return 0;
          });
          setBoardsData(sortData);
        } else {
          console.log("No boards data available");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    get(child(ref(database), "users/" + auth.currentUser?.uid + "/tasks"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const res = snapshot.val();
          setTasksData(Object.values(res));
        } else {
          console.log("No tasks data available");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    boardsData &&
      remove(ref(database, "users/" + auth.currentUser?.uid + "/boards"));
    boardsData && setIsLoading(false);

    boardsData?.map((board) =>
      dispatch(
        addBoard({
          name: board.name,
          columns: board.columns || [],
          time: board.time,
        })
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardsData]);

  useEffect(() => {
    if (!auth.currentUser) return;
    tasksData &&
      remove(ref(database, "users/" + auth.currentUser?.uid + "/tasks"));

    tasksData?.map((task) =>
      dispatch(
        addNewTask({
          boardUuid: task.boardUuid,
          columnUuid: task.columnUuid,
          title: task.title,
          description: task.description,
          subtasks: task.subtasks,
        })
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksData]);

  return { boardsData, isLoading };
};
