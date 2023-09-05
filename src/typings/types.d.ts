declare type RootState = ReturnType<typeof store.getState>;

declare type SubtaskType = {
  text: string;
  checked: boolean;
};
declare type SubtasksType = SubtaskType[];

declare type TaskType = {
  uuid: string;
  boardUuid: string;
  columnUuid: string;
  title: string;
  description: string;
  subtasks: SubtasksType;
};
declare type TasksType = TaskType[];

declare type ColumnType = {
  uuid: string;
  title: string;
};
declare type ColumnsType = ColumnType[];

declare type BoardType = {
  uuid: string;
  name: string;
  columns: ColumnsType;
};

declare type Boards = BoardType[];

declare type BoardsType = {
  boards: Boards;
};

declare type Store = {
  boards: Boards;
  tasks: TasksType;
  selectedBoard?: any;
};

declare type AddBoardPayloadType = {
  name: string | undefined;
  columns: { title: string }[];
};

declare type AddBoardActionType = {
  type: string;
  payload: AddBoardPayloadType;
};

declare type SelectBoardActionType = {
  type: string;
  payload: { board: BoardType };
};
