export const addBoardName = ({ name }: BoardNameType) => {
  return {
    type: "board/addBoardName",
    payload: {
      name,
    },
  };
};

export const addColumns = ({ board_columns }: ColumnsType) => {
  return {
    type: "board/addColumns",
    payload: {
      board_columns: board_columns,
    },
  };
};

export const addBoard = ({ name,board_columns  }: any) => {
  return {
    type: "board/addBoard",
    payload: {
      name, board_columns
    },
  };
};
