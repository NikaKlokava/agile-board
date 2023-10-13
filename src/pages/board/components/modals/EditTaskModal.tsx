import { FieldArray, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../shared/components/button";
import { DescriptionField } from "../../../../shared/components/description/DescriptionField";
import { Input } from "../../../../shared/components/input";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { Select } from "../../../../shared/components/select";
import { FieldName } from "../../../../shared/components/field_name";
import cl from "./modal_styles.module.css";
import { EditTaskSchema } from "../../../../utils/utils";
import { AddBtn } from "../../../../shared/components/add_button";
import { RootState } from "../../../../redux/store/store";
import { editTask, moveTask } from "../../../../redux/reducers/tasksSlice";

type Props = {
  taskUuid: string;
  onClose: () => void;
  onTaskModalClose: () => void;
};

export const EditTaskModal = ({
  taskUuid,
  onClose,
  onTaskModalClose,
}: Props) => {
  const activeBoard = useSelector((state: RootState) => state.activeBoard);

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const taskIndex = tasks.findIndex((task) => task.uuid === taskUuid);
  const task = tasks[taskIndex];

  const columnIndex = activeBoard.columns.findIndex(
    (column) => column.uuid === task.columnUuid
  );
  const column = activeBoard.columns[columnIndex]?.title;

  const dispatch = useDispatch();

  const checkedSubtasks = task?.subtasks?.reduce(
    (accum: boolean[], current) => {
      return [...accum, current.checked];
    },
    []
  );

  const onSubmit = (values: EditTaskType) => {
    const columnIndex = activeBoard.columns.findIndex(
      (column) => column.title === values.columnTitle
    );

    const columnUuid = activeBoard.columns[columnIndex].uuid;
    const subtasks = values.subtasks.filter(
      (subtask) => subtask?.text && subtask?.text.trimStart().length !== 0
    );
    columnUuid && dispatch(moveTask({ taskUuid, columnUuid }));
    dispatch(
      editTask({
        taskUuid,
        title: values.title,
        description: values.description,
        subtasks,
      })
    );
    onClose();
    onTaskModalClose();
  };

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={{
          title: task?.title,
          description: task?.description,
          subtasks: task?.subtasks?.reduce((accum: string[], current) => {
            return [...accum, current.text];
          }, []),
          columnTitle: column,
        }}
        validationSchema={EditTaskSchema}
        onSubmit={(values) => {
          const newSubtasks = values.subtasks.reduce(
            (accum: { text: string; checked: boolean }[], current, index) => {
              return [
                ...accum,
                {
                  text: current,
                  checked: checkedSubtasks[index],
                },
              ];
            },
            []
          );
          onSubmit({
            ...values,
            subtasks: newSubtasks,
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
              Edit Task
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
                    {props.values.subtasks?.map((_, index) => (
                      <Input
                        key={index}
                        formikName={`subtasks[${index}]`}
                        remove={arrayHelpers.remove}
                        index={index}
                        checked={checkedSubtasks}
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
              text="Save Edit"
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
