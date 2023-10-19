import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { Select } from "../../../../shared/components/select";
import { checkedStatus } from "../../../../utils/utils";
import { Button } from "../../../../shared/components/button";
import { OptionsIcon } from "../../../../shared/components/options_icon";
import { memo, useMemo, useState } from "react";
import { OptionsModal } from "./OptionsModal";
import { DeleteModal } from "./DeleteModal";
import classes from "classnames";
import cl from "./modal_styles.module.css";
import { EditTaskModal } from "./EditTaskModal";
import { RootState } from "../../../../redux/store/store";
import { checkSubtask, moveTask } from "../../../../redux/reducers/tasksSlice";

type Props = {
  taskUuid: string | undefined;
  onClose: () => void;
};

export const TaskModal = memo(({ taskUuid, onClose }: Props) => {
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
  const [deleteTaskVisible, setDeleteTaskVisible] = useState<boolean>(false);
  const [editTaskVisible, setEditTaskVisible] = useState<boolean>(false);
  const [checkedSubtasks, setCheckedSubtasks] = useState<number>(0);

  const activeBoard = useSelector((state: RootState) => state.activeBoard);

  const tasks: Tasks = useSelector((state: RootState) => state.tasks.tasks);

  const taskIndex = tasks.findIndex((task) => task.uuid === taskUuid);
  const task: Task = tasks[taskIndex];

  const columnIndex = activeBoard.columns.findIndex(
    (column) => column?.uuid === task.columnUuid
  );
  const columnTitle = activeBoard.columns[columnIndex]?.title;

  useMemo(() => {
    const checked = checkedStatus(task);
    setCheckedSubtasks(checked);
  }, [task]);

  const dispatch = useDispatch();

  const onSubmit = (values: TaskModalType) => {
    const columnIndex = activeBoard.columns.findIndex(
      (column) => column.title === values.columnTitle
    );
    const columnUuid = activeBoard.columns[columnIndex].uuid;

    columnUuid && dispatch(moveTask({ taskUuid: values.taskUuid, columnUuid }));
    onClose();
  };

  if (editTaskVisible)
    return (
      <EditTaskModal
        taskUuid={task.uuid}
        onTaskModalClose={onClose}
        onClose={() => setEditTaskVisible(false)}
      />
    );
  if (deleteTaskVisible)
    return (
      <DeleteModal
        activeName={task && task.title}
        type={"task"}
        taskUuid={task.uuid}
        onClose={() => {
          onClose();
          setDeleteTaskVisible(false);
        }}
      />
    );
  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={{
          checked: task?.subtasks.reduce((accum: boolean[], current) => {
            return [...accum, current.checked];
          }, []),
          taskUuid: task?.uuid,
          columnTitle: columnTitle,
        }}
        onSubmit={(values) => onSubmit(values)}
      >
        {(props) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              props.handleSubmit();
            }}
            className={cl.form_container}
          >
            <div className={cl.modal_task_container}>
              <h2 className={cl.modal_task_title} data-testid="task-modal">
                {task?.title}
              </h2>
              <OptionsIcon onOpen={() => setOptionsVisible((prev) => !prev)} />
            </div>
            <p className={cl.description}>{task?.description}</p>
            {task?.subtasks?.length !== 0 && (
              <div className={cl.container}>
                <p
                  className={cl.title}
                >{`Subtasks (${checkedSubtasks} of ${task?.subtasks?.length})`}</p>
                {task?.subtasks?.map((subtask, i) => {
                  return (
                    <div
                      className={classes(
                        cl.subtasks_checkbox,
                        props.values.checked[i] === true && cl.active
                      )}
                      key={i}
                    >
                      <Field
                        className={cl.checkbox}
                        type="checkbox"
                        name={`checked.${i}`}
                        onClick={() => {
                          subtask.uuid &&
                            dispatch(
                              checkSubtask({
                                subtaskUuid: subtask.uuid,
                                taskUuid: task.uuid,
                              })
                            );
                        }}
                      />
                      <p>{subtask.text}</p>
                    </div>
                  );
                })}
              </div>
            )}
            <Select />
            <Button
              text={"Save"}
              withIcon={false}
              testid={"save-task"}
              type="submit"
            />
          </Form>
        )}
      </Formik>
      {optionsVisible && (
        <OptionsModal
          type={"Task"}
          onEditClick={() => setEditTaskVisible(true)}
          onDeleteClick={() => setDeleteTaskVisible(true)}
        />
      )}
    </ModalWrapper>
  );
});
