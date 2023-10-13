import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { Button } from "../../../../shared/components/button";
import { FieldArray, Form, Formik } from "formik";
import { Input } from "../../../../shared/components/input";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "../../../../shared/components/select";
import { initialTaskData, TaskSchema } from "../../../../utils/utils";
import { FieldName } from "../../../../shared/components/field_name";
import { DescriptionField } from "../../../../shared/components/description/DescriptionField";
import { AddBtn } from "../../../../shared/components/add_button";
import { v4 as uuidv4 } from "uuid";
import cl from "./modal_styles.module.css";
import { RootState } from "../../../../redux/store/store";
import { addNewTask } from "../../../../redux/reducers/tasksSlice";

type Props = {
  onClose: () => void;
};

export const NewTaskModal = ({ onClose }: Props) => {
  const activeBoard = useSelector((state: RootState) => state.activeBoard);
  const dispatch = useDispatch();

  const initialData = {
    ...initialTaskData,
    columnTitle: activeBoard.columns[0]?.title,
  };

  const onSubmit = (values: NewTaskType) => {
    const columnIndex = activeBoard.columns.findIndex(
      (column) => column.title === values.columnTitle
    );
    const columnUuid = activeBoard.columns[columnIndex].uuid;

    const subtasks = values.subtasks.filter(
      (subtask) => subtask?.text && subtask.text.trimStart().length !== 0
    );
    columnUuid &&
      activeBoard.uuid &&
      dispatch(
        addNewTask({
          boardUuid: activeBoard.uuid,
          columnUuid: columnUuid,
          title: values.title,
          description: values.description,
          subtasks: subtasks,
        })
      );
    onClose();
  };

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={initialData}
        validationSchema={TaskSchema}
        onSubmit={(values) => {
          onSubmit({
            ...values,
            subtasks: values.subtasks.map((e) => ({
              text: e,
              uuid: uuidv4(),
              checked: false,
            })),
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
            <h2 className={cl.modal_title} data-testid="new-task-modal">
              Add New Task
            </h2>
            <FieldName formikName="title" fieldName={"Task name"} />
            {props.errors.title && props.touched.title && (
              <p style={{ color: "red" }}>{props.errors.title}</p>
            )}
            <DescriptionField />
            <FieldArray
              name="subtasks"
              render={(arrayHelpers) => (
                <>
                  <div className={cl.container}>
                    <p className={cl.title}>Subtasks</p>
                    {props.values.subtasks.map((_, index) => (
                      <Input
                        key={index}
                        formikName={`subtasks[${index}]`}
                        remove={arrayHelpers.remove}
                        index={index}
                      />
                    ))}
                    <AddBtn
                      add={arrayHelpers.push}
                      text="Add New Subtask"
                      testid={"add-new-subtask-btn"}
                    />
                  </div>
                </>
              )}
            />
            <Select />
            <Button
              text="Create Task"
              withIcon={false}
              newClass="center"
              testid={"create-task-btn"}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};
