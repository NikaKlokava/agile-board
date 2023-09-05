import { useFormikContext } from "formik";
import { useSelector } from "react-redux";

export const Select = () => {
  const { handleChange } = useFormikContext();
  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );

  return (
    <select onChange={handleChange} name="columnTitle">
      {activeBoard.columns.map((column, i) => (
        <option key={i} value={column.title}>
          {column.title}
        </option>
      ))}
    </select>
  );
};
