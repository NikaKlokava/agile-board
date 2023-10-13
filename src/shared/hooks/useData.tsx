import { onAuthStateChanged } from "firebase/auth";
import { child, get, getDatabase, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth, database } from "../../firebase";
import { addBoard } from "../../redux/reducers/boardsSlice";
import { addNewTask } from "../../redux/reducers/tasksSlice";

export const useData = () => {
  const [boardsData, setBoardsData] = useState<Boards>();
  const [tasksData, setTasksData] = useState<Tasks>();

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const dbRef = ref(getDatabase());
      get(child(dbRef, "users/" + user?.uid + "/boards"))
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
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });

      get(child(dbRef, "users/" + user?.uid + "/tasks"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const res = snapshot.val();
            setTasksData(Object.values(res));
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, []);

  useEffect(() => {
    boardsData &&
      onAuthStateChanged(auth, (user) =>
        remove(ref(database, "users/" + user?.uid + "/boards"))
      );

    boardsData?.map((board) =>
      dispatch(
        addBoard({
          name: board.name,
          columns: board.columns || [],
          time: board.time,
        })
      )
    );

    // setNewBoardVisible(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardsData]);

  useEffect(() => {
    tasksData &&
      onAuthStateChanged(auth, (user) =>
        remove(ref(database, "users/" + user?.uid + "/tasks"))
      );
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

  return { boardsData };
};
