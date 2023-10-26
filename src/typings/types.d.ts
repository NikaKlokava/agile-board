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
  columns: ColumnsType;
  uuid: string;
  columnUuid?: string;
  title?: string;
  time: number;
  usersEmail: string[];
};

declare type Boards = BoardType[];

declare type BoardsType = {
  boards: Boards;
};

declare type UpdateBoardAction = {
  name: string;
  columns: ColumnsType;
  uuid: string;
  usersEmail: string[];
  time: number;
};

declare type AddNewTaskAction = {
  uuid: string;
  boardUuid: string;
  columnTitle: string;
  title: string;
  description: string;
  subtasks: SubtasksType;
  time: number;
};

declare type MoveTaskAction = {
  columnUuid: string;
  taskUuid: string;
  time: number;
};

declare type EditTaskType = {
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
