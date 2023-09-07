import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
type Props = {
  colUuid?: string;
};

export const Select = ({ colUuid }: Props) => {
  const { handleChange } = useFormikContext();
  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );
  const currentColumn = activeBoard.columns.find(
    (column) => column.uuid === colUuid
  )?.title;
  
  return (
    <select
      onChange={handleChange}
      name="columnTitle"
      defaultValue={currentColumn}
    >
      {activeBoard.columns.map((column, i) => (
        <option key={i} value={column.title}>
          {column.title}
        </option>
      ))}
    </select>
  );
};
