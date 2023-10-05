import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { Boards } from "../../../../shared/components/boards";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { NewBoardModal } from "./NewBoardModal";

type Props = {
  onClose: () => void;
};

export const BoardNavbarModal = ({ onClose }: Props) => {
  const [newBoardVisible, setNewBoardVisible] = useState<boolean>(false);

  const activeBoard = useSelector((state: RootState) => state.activeBoard);
  const noBoard = activeBoard.name === "";

  if (newBoardVisible || noBoard)
    return <NewBoardModal onClose={() => setNewBoardVisible(false)} />;

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Boards onBoardVisible={() => setNewBoardVisible(true)} />
    </ModalWrapper>
  );
};
