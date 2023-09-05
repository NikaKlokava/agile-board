import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { checkSubtask } from "../../../../redux/actionCreators/newBoardCreator";
import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { Select } from "../../../../shared/components/select";
import classes from "classnames";
import cl from "./modal_styles.module.css";

type Props = {
  taskUuid: string;
  onClose: () => void;
};

export const TaskModal = ({ taskUuid, onClose }: Props) => {
  const tasks = useSelector<RootState, TasksType>((state) => state.tasks.tasks);

  const task = tasks.find((task) => task.uuid === taskUuid);
  // console.log(task)
  const checkedSubtasks = task?.subtasks.reduce((accum: boolean[], current) => {
    if (current.checked === true) return [...accum, current.checked];
    return accum;
  }, []);
  console.log(checkedSubtasks);
  const dispatch = useDispatch();

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik initialValues={{ init: "undefined" }} onSubmit={() => {}}>
        {(props) => (
          <>
            <h2 className={cl.modal_task_title} data-testid="task-modal">
              {task?.title}
            </h2>
            <p className={cl.description}>{task?.description}</p>
            <FieldWrapper
              fieldName={`Subtasks (${checkedSubtasks?.length} of ${task?.subtasks.length})`}
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
            <FieldWrapper fieldName={"Current Status"}>
              <Select />
            </FieldWrapper>
          </>
        )}
      </Formik>
    </ModalWrapper>
  );
};
