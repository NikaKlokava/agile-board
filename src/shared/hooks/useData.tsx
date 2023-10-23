import { child, get, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth, database } from "../../firebase";
import { addBoard } from "../../redux/reducers/boardsSlice";
import { addNewTask } from "../../redux/reducers/tasksSlice";

export const useData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   setIsLoading(true);
  //   get(child(ref(database), "users/" + auth.currentUser?.uid + "/boards"))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         const res = snapshot.val();
  //         const boards: Boards = Object.values(res);
  //         const sortedBoards = boards.sort((a, b) => {
  //           if (a.time && b.time) {
  //             return a.time - b.time;
  //           }
  //           return 0;
  //         });
  //         sortedBoards &&
  //           remove(ref(database, "users/" + auth.currentUser?.uid + "/boards"));

  //         sortedBoards.map((board) =>
  //           dispatch(
  //             addBoard({
  //               name: board.name,
  //               columns: board.columns || [],
  //               time: board.time,
  //             })
  //           )
  //         );
  //       } else {
  //         console.log("No boards data available");
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   get(child(ref(database), "users/" + auth.currentUser?.uid + "/tasks"))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         const res = snapshot.val();
  //         const tasks: Tasks = Object.values(res);
  //         if (!auth.currentUser) return;
  //         tasks &&
  //           remove(ref(database, "users/" + auth.currentUser?.uid + "/tasks"));

  //         tasks?.map((task) =>
  //           dispatch(
  //             addNewTask({
  //               boardUuid: task.boardUuid,
  //               columnUuid: task.columnUuid,
  //               title: task.title,
  //               description: task.description,
  //               subtasks: task.subtasks,
  //             })
  //           )
  //         );
  //       } else {
  //         console.log("No tasks data available");
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   setIsLoading(false);
  // }, [dispatch]);

  return { isLoading };
};
