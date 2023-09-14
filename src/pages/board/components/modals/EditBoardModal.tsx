import { Formik } from "formik";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewColumn } from "../../../../redux/actionCreators/newBoardCreator";
import { Button } from "../../../../shared/components/button";
import { FieldName } from "../../../../shared/components/field_name";
import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import { Input } from "../../../../shared/components/input";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { EditBoardSchema } from "../../../../utils/utils";
import cl from "./modal_styles.module.css";

type Props = {
  onClose: () => void;
};

export const EditBoardModal = memo(({ onClose }: Props) => {
  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );

  const [columnLength, setColumnLength] = useState<number>(
    activeBoard.columns.length
  );
  const dispatch = useDispatch();

  const handleSubmit = (values: BoardType) => {
    const columns = values.columns.filter(
      (column) => column?.title && column.title.trimStart().length !== 0
    );
    dispatch(addNewColumn(values.uuid, values.name, columns));
    onClose();
  };

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={activeBoard}
        validationSchema={EditBoardSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(props) => (
          <>
            <h2 className={cl.modal_title} data-testid="edit-board-modal">
              Edit Board
            </h2>
            <FieldName formikName={"name"} name={activeBoard.name} />
            <FieldWrapper fieldName="Board Columns">
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
});
