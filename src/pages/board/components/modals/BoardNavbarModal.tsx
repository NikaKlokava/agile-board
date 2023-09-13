import { useState } from "react";
import { Boards } from "../../../../shared/components/boards";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { NewBoardModal } from "./NewBoardModal";

type Props = {
  onClose: () => void;
};

export const BoardNavbarModal = ({ onClose }: Props) => {
  const [newBoardVisible, setNewBoardVisible] = useState<boolean>(false);
  return (
    <>
      {!newBoardVisible && (
        <ModalWrapper onWrapperClick={onClose}>
          <Boards onBoardVisible={() => setNewBoardVisible(true)} />
        </ModalWrapper>
      )}
      {newBoardVisible && (
        <NewBoardModal onClose={() => setNewBoardVisible(false)} />
      )}
    </>
  );
};
