export const initialBoardData = {
  name: undefined,
  columns: [{ title: "" }],
};

export const checkedStatus = (task: TaskType) => {
  return task.subtasks.reduce((accum: boolean[], current) => {
    if (current.checked === true) return [...accum, current.checked];
    return accum;
  }, []).length;
};
