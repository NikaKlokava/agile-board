import * as Yup from "yup";

export const initialBoardData = {
  name: "",
  columns: ["", ""],
};

export const initialTaskData = {
  boardUuid: "",
  columnTitle: "",
  title: "",
  description: "",
  subtasks: ["", ""],
};

export const checkedStatus = (task: Task) => {
  return task?.subtasks.reduce((accum: boolean[], current) => {
    if (current.checked === true) return [...accum, current.checked];
    return accum;
  }, []).length;
};

export const BoardSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too Short!").max(14, "Too Long!").required(),
  columns: Yup.array().of(Yup.string().max(14, "Too Long!")),
});

export const TaskSchema = Yup.object().shape({
  boardUuid: Yup.string(),
  columnTitle: Yup.string(),
  title: Yup.string().min(3, "Too Short!").max(45, "Too Long!").required(),
  description: Yup.string(),
  subtasks: Yup.array().of(Yup.string().max(14, "Too Long!")),
});

export const EditBoardSchema = Yup.object().shape({
  uuid: Yup.string(),
  name: Yup.string().min(3, "Too Short!").max(14, "Too Long!").required(),
  columns: Yup.array().of(Yup.string().max(14, "Too Long!")),
});

export const EditTaskSchema = Yup.object().shape({
  title: Yup.string().min(3, "Too Short!").max(45, "Too Long!").required(),
  description: Yup.string(),
  subtasks: Yup.array().of(Yup.string().max(14, "Too Long!")),
  columnTitle: Yup.string(),
});
