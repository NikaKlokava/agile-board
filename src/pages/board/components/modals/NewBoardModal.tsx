import { Button } from "../../../../shared/components/button";
import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { Formik } from "formik";
import cl from "./modal_styles.module.css";
import store from "../../../../redux/store/store";
import {
  addBoard,
  // addBoardName,
  // addColumns,
} from "../../../../redux/actionCreators/newBoardCreator";
import { Input } from "../../../../shared/components/input";
import { useState } from "react";

type Props = {
  onClose: () => void;
};

export const NewBoardModal = ({ onClose }: Props) => {
  const [columns, setColumns] = useState<number>(2);

  const data = { name: undefined, board_columns: [] };

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={data}
        onSubmit={(values) => {
          store.dispatch(
            addBoard({
              name: values.name!,
              board_columns: values.board_columns,
            })
          );
          onClose();
        }}
      >
        {(props) => (
          <>
            <h2 className={cl.modal_title} data-testid="new-board-modal">
              Add New Board
            </h2>
            <FieldWrapper fieldName={"Board Name"}>
              <input
                type={"text"}
                placeholder="e.g Take coffee break"
                spellCheck={false}
                className={cl.input_style}
                autoComplete="off"
                name="name"
                onChange={props.handleChange}
              />
            </FieldWrapper>
            <FieldWrapper fieldName={"Board Columns"} clName="style_container">
              {Array.from({ length: columns }, (_, index) => (
                <Input index={index} key={index} />
              ))}
            </FieldWrapper>
            <Button
              text={"Add New Column"}
              withIcon={true}
              testid={"add-new-column-btn"}
              onClick={() => setColumns((prev) => prev + 1)}
            />
            <Button
              text={"Create New Board"}
              withIcon={false}
              newClass="center"
              testid="create-new-board-btn"
              onClick={() => {
                props.handleSubmit();
              }}
            />
          </>
        )}
      </Formik>
    </ModalWrapper>
  );
};
