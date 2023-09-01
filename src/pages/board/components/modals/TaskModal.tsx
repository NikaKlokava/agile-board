import { useState } from "react";
import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { Select } from "../../../../shared/components/select";
import { Subtask } from "../../../../shared/components/subtask";
import cl from "./modal_styles.module.css";

type Props = {
  task?: TaskType;
  onClose?: () => void;
};

export const TaskModal = ({ onClose, task }: Props) => {
  const [doneSubtask, setDoneSubtask] = useState(false);
  return (
    <ModalWrapper onWrapperClick={onClose}>
      <h2 className={cl.modal_task_title} data-testid="task-modal">
        {task?.taskName}
      </h2>
      <p className={cl.description}>{task?.description}</p>
      <FieldWrapper fieldName={`Subtasks (0 of ${task?.subtasks.length})`}>
        {task?.subtasks.map((subtask, i) => {
          return (
            <Subtask
              subtask={subtask}
              index={i}
              active={doneSubtask === true}
              onChecked={() => setDoneSubtask(true)}
            />
          );
        })}
      </FieldWrapper>
      <FieldWrapper fieldName={"Current Status"}>
        <Select />
      </FieldWrapper>
    </ModalWrapper>
  );
};
