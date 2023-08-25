type MockSubtaskType = {
  name: string;
};

type MockTaskType = {
  name: string;
  description: string;
  subtasks: Array<MockSubtaskType>;
};

export const MockTask: MockTaskType = {
  name: "Create something",
  description: "... it's very important ...",
  subtasks: [
    { name: "while doing 1..." },
    { name: "while doing 2..." },
    { name: "while doing 3..." },
  ],
};

export const MockBoards = [
  {
    name: "Platform Launch",
    board_column: [
      { title: "Todo", tasks: Array.from({ length: 4 }, () => MockTask) },
      { title: "Doing", tasks: Array.from({ length: 6 }, () => MockTask) },
      { title: "Done", tasks: Array.from({ length: 2 }, () => MockTask) },
    ],
  },
  {
    name: "Marketing Plan",
    board_column: [
      { title: "Todo", tasks: Array.from({ length: 7 }, () => MockTask) },
      { title: "Doing", tasks: Array.from({ length: 2 }, () => MockTask) },
      { title: "Done", tasks: Array.from({ length: 4 }, () => MockTask) },
    ],
  },
  {
    name: "Roadmap",
    board_column: [
      { title: "Now", tasks: Array.from({ length: 4 }, () => MockTask) },
      { title: "Next", tasks: Array.from({ length: 6 }, () => MockTask) },
    ],
  },
];
