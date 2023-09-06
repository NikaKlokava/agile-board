import { Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewColumn } from "../../../../redux/actionCreators/newBoardCreator";
import { Button } from "../../../../shared/components/button";
import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import { Input } from "../../../../shared/components/input";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import cl from "./modal_styles.module.css";

type Props = {
  onClose?: () => void;
};

export const EditBoardModal = ({ onClose }: Props) => {
  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );
  const initialLength = activeBoard.columns.length;
  const [columnLength, setColumnLength] = useState<number>(initialLength);
  const dispatch = useDispatch();

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={activeBoard}
        onSubmit={(values) => {
          const columns = values.columns.filter((column) => column.title);
          dispatch(addNewColumn(values.uuid, values.name, columns));
        }}
      >
        {(props) => (
          <>
            <h2 className={cl.modal_title} data-testid="edit-board-modal">
              Edit Board
            </h2>
            <FieldWrapper fieldName="Board Name">
              <input
                type={"text"}
                placeholder="e.g Take coffee break"
                spellCheck={false}
                className={cl.input_style}
                autoComplete="off"
                name="name"
                defaultValue={activeBoard.name}
                onChange={props.handleChange}
              />
            </FieldWrapper>
            <FieldWrapper fieldName="Board Columns" clName="style_container">
              {Array.from({ length: columnLength }, (_, i) => {
                return (
                  <Input
                    key={i}
                    formikName={`columns[${i}].title`}
                    defaultVal={activeBoard.columns[i]?.title}
                  />
                );
              })}
            </FieldWrapper>
            <Button
              text={"Add New Column"}
              withIcon={true}
              testid={"add-new-column-btn"}
              onClick={() => setColumnLength((prev) => prev + 1)}
            />
            <Button
              text={"Save Changes"}
              withIcon={false}
              newClass="center"
              testid={"save-changes-btn"}
              onClick={props.handleSubmit}
            />
          </>
        )}
      </Formik>
    </ModalWrapper>
  );
};
