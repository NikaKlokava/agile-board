declare type SubtaskType = {
  uuid?: string;
  text: string;
  checked: boolean;
};
declare type SubtasksType = SubtaskType[];

declare type Task = {
  uuid: string;
  boardUuid: string;
  columnUuid: string;
  title: string;
  description: string;
  subtasks: SubtasksType;
  time: number;
};
declare type Tasks = Task[];

declare type TasksType = { tasks: Task[] };

declare type ColumnType = {
  uuid: string;
  title: string;
};
declare type ColumnsType = ColumnType[];

declare type BoardType = {
  name: string;
  columns: { title: string; uuid?: string }[];
  uuid?: string;
  columnUuid?: string;
  title?: string;
  time?: number;
};

declare type Boards = BoardType[];

declare type BoardsType = {
  boards: Boards;
};

declare type AddBoardAction = {
  name: string;
  columns: { title: string; uuid?: strign }[];
  time?: number
};

declare type AddColumnAction = {
  name: string;
  columns: { title: string; uuid?: string }[];
  uuid: string | undefined;
};

declare type AddNewTaskAction = {
  boardUuid: string;
  columnUuid: string;
  title: string;
  description: string;
  subtasks: SubtasksType;
};

declare type EditTaskAction = {
  subtasks: SubtasksType;
  title: string;
  description: string;
  taskUuid: string;
};

declare type MoveTaskAction = { columnUuid: string; taskUuid: string };

declare type EditTaskType = {
  title: string;
  description: string;
  subtasks: SubtasksType;
  columnTitle: string;
};

declare type NewTaskType = {
  boardUuid: string;
  title: string;
  description: string;
  subtasks: SubtasksType;
  columnTitle: string;
};

declare type TaskModalType = {
  checked: boolean[];
  taskUuid: string;
  columnTitle: string;
};
