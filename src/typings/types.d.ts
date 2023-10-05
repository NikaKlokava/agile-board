declare type SubtaskType = {
  uuid: string;
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
};

declare type Boards = BoardType[];

declare type BoardsType = {
  boards: Boards;
};
