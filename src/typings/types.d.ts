type BoardType = {
  name?: string;
  board_columns?: { title: string }[];
};

type BoardNameType = {
  name: string;
};

type ColumnsType = {
  board_columns: string[];
};

type BoardsType = {
  boards: [
    {
      name: string | null;
      board_columns: string[];
    }
  ];
};

// type BoardsType = {
//   boards: [
//     {
//       name: string | null;
//       board_columns: [
//         {
//           title: string;
//           tasks: [
//             { taskName: string; description: string; subtasks: string[] }
//           ];
//         }
//       ];
//     }
//   ];
// };
