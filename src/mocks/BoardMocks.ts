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

export const MockBoard = {
  name: "Test Board 1",
  columns: [{ uuid: "test uuid", title: "test title" }],
  uuid: "test uuid",
  time: 0,
  usersEmail: ["test user"],
};

export const MockBoardWithoutColumn = {
  name: "Test Board 2",
  columns: [],
  uuid: "test uuid",
  time: 0,
  usersEmail: ["test user"],
};
