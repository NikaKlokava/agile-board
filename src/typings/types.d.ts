declare type BoardType = {
  name?: string;
  board_columns?: { title: string }[];
};

declare type BoardNameType = {
  name: string;
};

declare type ColumnsType = {
  board_columns: string[];
};

declare type TaskType = {
  taskName: string;
  description: string;
  subtasks: string[];
};

declare type BoardsType = {
  boards: [
    {
      name: string | null;
      board_columns: [
        {
          title: string;
          tasks: [
            { taskName: string; description: string; subtasks: string[] }
          ];
        }
      ];
      selected: boolean;
    }
  ];
};

declare type Boards = {
  name: string;
  board_columns: {
    title: string;
    tasks: {
      taskName: string;
      description: string;
      subtasks: never[];
    }[];
  }[];
  selected: boolean;
}[];
declare type RootState = ReturnType<typeof store.getState>;

declare type TaskType =  {
  taskName: string;
  description: string;
  subtasks: never[];
}