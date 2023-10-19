import { Button } from "../../../../shared/components/button";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { FieldArray, Form, Formik } from "formik";
import { Input } from "../../../../shared/components/input";
import { BoardSchema, initialBoardData } from "../../../../utils/utils";
import { useDispatch } from "react-redux";
import { FieldName } from "../../../../shared/components/field_name";
import { AddBtn } from "../../../../shared/components/add_button";
import { addBoard } from "../../../../redux/reducers/boardsSlice";
import cl from "./modal_styles.module.css";

type Props = {
  onClose: () => void;
};

export const NewBoardModal = ({ onClose }: Props) => {
  const dispatch = useDispatch();

  const onSubmit = (values: BoardType) => {
    const columns = values.columns.filter(
      (column) => column?.title && column.title.trimStart().length !== 0
    );
    values.name && dispatch(addBoard({ name: values.name, columns: columns }));
    onClose();
  };

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={initialBoardData}
        validationSchema={BoardSchema}
        onSubmit={(values) => {
          onSubmit({
            ...values,
            columns: values.columns.map((e) => ({ title: e })),
          });
        }}
      >
        {(props) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              props.handleSubmit();
            }}
            className={cl.form_container}
          >
            <h2 className={cl.modal_title} data-testid="new-board-modal">
              Add New Board
            </h2>
            <FieldName formikName={"name"} fieldName={"Board name"} />
            {props.errors.name && props.touched.name && (
              <p style={{ color: "red" }}>{props.errors.name}</p>
            )}
            <FieldArray
              name="columns"
              render={(arrayHelpers) => (
                <>
                  <div className={cl.container}>
                    <p className={cl.title}>Board Columns</p>
                    {props.values.columns.map((_, index) => (
                      <Input
                        key={index}
                        formikName={`columns[${index}]`}
                        remove={arrayHelpers.remove}
                        index={index}
                      />
                    ))}
                  </div>
                  <AddBtn
                    add={arrayHelpers.push}
                    text="Add New Column"
                    testid={"add-new-column-btn"}
                  />
                </>
              )}
            />
            <Button
              text={"Create New Board"}
              withIcon={false}
              newClass="center"
              testid="create-new-board-btn"
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};
