import { useDispatch, useSelector } from "react-redux";
import { checkSubtask } from "../../../../redux/actionCreators/newBoardCreator";
import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { Select } from "../../../../shared/components/select";
import cl from "./modal_styles.module.css";

type Props = {
  task: TaskType;
  column: ColumnType;
  onClose: () => void;
};

export const TaskModal = ({ onClose, task, column }: Props) => {
  const storeData = useSelector<RootState, Boards>((state) => state.boards);
  // const activeBoard = storeData.find((elem) => elem.selected === true);
  const dispatch = useDispatch();

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <h2 className={cl.modal_task_title} data-testid="task-modal">
        {/* {task?.taskName} */}
      </h2>
      <p className={cl.description}>{task?.description}</p>
      <FieldWrapper fieldName={`Subtasks (0 of ${task?.subtasks.length})`}>
        {task &&
          task.subtasks.map((subtask, i) => {
            return (
              <div className={cl.subtasks_checkbox} key={i}>
                <input
                  type={"checkbox"}
                  className={cl.checkbox}
                  onChange={
                    () => console.log("")
                    // dispatch(
                    //   checkSubtask(
                    //     activeBoard!.name!,
                    //     column.title,
                    //     task.taskName,
                    //     subtask.text
                    //   )
                    // )
                  }
                />
                <p>{subtask.text}</p>
              </div>
            );
          })}
      </FieldWrapper>
      <FieldWrapper fieldName={"Current Status"}>
        <Select />
      </FieldWrapper>
    </ModalWrapper>
  );
};
