import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSubtask,
  moveTask,
} from "../../../../redux/actionCreators/newBoardCreator";
import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { Select } from "../../../../shared/components/select";
import { checkedStatus } from "../../../../utils/utils";
import classes from "classnames";
import cl from "./modal_styles.module.css";
import { Button } from "../../../../shared/components/button";

type Props = {
  taskUuid: string;
  onClose: () => void;
};

export const TaskModal = ({ taskUuid, onClose }: Props) => {
  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );

  const tasks = useSelector<RootState, TasksType>((state) => state.tasks.tasks);
  const task = tasks.find((task) => task.uuid === taskUuid);

  const columnTitle = activeBoard.columns.find(
    (column) => column.uuid === task?.columnUuid
  )?.title;

  const checkedSubtasks = checkedStatus(task!);

  const dispatch = useDispatch();

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={{
          taskUuid: task && task.uuid,
          columnTitle: columnTitle,
        }}
        onSubmit={(values) => {
          const columnUuid = activeBoard.columns.find(
            (column) => column.title === values.columnTitle
          )!.uuid;
          dispatch(moveTask(values.taskUuid!, columnUuid));
          onClose();
        }}
      >
        {(props) => (
          <>
            <h2 className={cl.modal_task_title} data-testid="task-modal">
              {task?.title}
            </h2>
            <p className={cl.description}>{task?.description}</p>
            {task?.subtasks.length !== 0 && (
              <FieldWrapper
                fieldName={`Subtasks (${checkedSubtasks} of ${task?.subtasks.length})`}
              >
                {task &&
                  task.subtasks.map((subtask, i) => {
                    return (
                      <div
                        className={classes(
                          cl.subtasks_checkbox,
                          subtask.checked && cl.active
                        )}
                        key={i}
                      >
                        <input
                          type={"checkbox"}
                          className={cl.checkbox}
                          defaultChecked={subtask.checked}
                          onClick={() => {
                            dispatch(checkSubtask(subtask.uuid));
                          }}
                        />
                        <p>{subtask.text}</p>
                      </div>
                    );
                  })}
              </FieldWrapper>
            )}
            <FieldWrapper fieldName={"Current Status"}>
              <Select colUuid={task?.columnUuid} />
            </FieldWrapper>
            <Button
              text={"Save"}
              withIcon={false}
              testid={"save-task"}
              onClick={props.handleSubmit}
            />
          </>
        )}
      </Formik>
    </ModalWrapper>
  );
};
