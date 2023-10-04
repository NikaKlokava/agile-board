import { FieldArray, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addNewColumn } from "../../../../redux/actionCreators/newBoardCreator";
import { Button } from "../../../../shared/components/button";
import { FieldName } from "../../../../shared/components/field_name";
import { Input } from "../../../../shared/components/input";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { EditBoardSchema } from "../../../../utils/utils";
import { AddBtn } from "../../../../shared/components/add_button";
import cl from "./modal_styles.module.css";

type Props = {
  onClose: () => void;
};

export const EditBoardModal = ({ onClose }: Props) => {
  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );

  const dispatch = useDispatch();

  const onSubmit = (values: BoardType) => {
    const columns = values.columns.filter(
      (column) => column?.title && column.title.trimStart().length !== 0
    );
    dispatch(addNewColumn(values.uuid, values.name, columns));
    onClose();
  };

  const initialData = {
    name: activeBoard.name,
    columns: activeBoard.columns.reduce((accum: string[], current) => {
      return [...accum, current.title];
    }, []),
    uuid: activeBoard.uuid,
  };

  const uuids = activeBoard.columns.reduce((accum: string[], current) => {
    return [...accum, current.uuid];
  }, []);

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={initialData}
        validationSchema={EditBoardSchema}
        onSubmit={(values) => {
          const columns = values.columns.filter(
            (column) => column && column.trimStart().length !== 0
          );
          const newColumns = columns.reduce(
            (accum: { title: string; uuid: string }[], current, index) => {
              return [...accum, { title: current, uuid: uuids[index] }];
            },
            []
          );
          onSubmit({
            ...values,
            columns: newColumns,
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
            <h2 className={cl.modal_title} data-testid="edit-board-modal">
              Edit Board
            </h2>
            <FieldName formikName={"name"} />
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
                        uuids={uuids}
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
              text={"Save Changes"}
              withIcon={false}
              newClass="center"
              testid={"save-changes-btn"}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};
