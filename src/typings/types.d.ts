declare type RootState = ReturnType<typeof store.getState>;

declare type SubtaskType = {
  uuid: string;
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
  time: number;
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
  uuid?: string;
  columnUuid?: string;
  title?: string;
  name: string | undefined;
  columns: { title: string; uuid?: string }[];
};

declare type AddBoardActionType = {
  type: string;
  payload: AddBoardPayloadType;
};

declare type SelectBoardActionType = {
  type: string;
  payload: { board: BoardType };
};

declare type AddTaskPayloadType = {
  boardUuid: string;
  columnUuid: string;
  title: string;
  description: string;
  subtasks: SubtasksType;
  subtaskUuid?: string;
  taskUuid?: string;
  time?: number;
};

declare type AddTaskActionType = {
  type: string;
  payload: AddTaskPayloadType;
};

declare type EditTaskType = {
  title: string;
  description: string;
  subtasks: SubtasksType;
  columnTitle: string;
};

declare type NewBoardType = {
  name: string | undefined;
  columns: {
    title: string;
  }[];
};

declare type NewTaskType = {
  columnTitle: string;
  boardUuid: string;
  title: string;
  description: string;
  subtasks: {
    uuid: string;
    text: string;
    checked: boolean;
  }[];
};

declare type TaskModalType = {
  taskUuid: string;
  columnTitle: string;
};
