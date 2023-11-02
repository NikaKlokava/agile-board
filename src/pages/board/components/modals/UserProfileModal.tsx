import { memo } from "react";
import { auth } from "../../../../firebase";
import { useAppSelector } from "../../../../redux/hooks/hook";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { StatisticsItem } from "../../../../shared/components/statistics_item";
import cl from "./modal_styles.module.css";

type Props = {
  onClose: () => void;
};

export const UserProfileModal = memo(({ onClose }: Props) => {
  const imgUrl = `${auth.currentUser?.photoURL}`;

  const tasks = useAppSelector((state) => state.tasks.tasks);
  const boards = useAppSelector((state) => state.boards.boards);

  const userBoards = boards.filter(
    (board) => board.usersEmail[0] === auth.currentUser?.email
  );

  const sharedBoards = boards.filter(
    (board) => board.usersEmail[0] !== auth.currentUser?.email
  );
  return (
    <ModalWrapper onWrapperClick={onClose}>
      <h2 className={cl.modal_title}>Profile</h2>
      <div
        className={cl.profile_avatar}
        style={{ background: imgUrl && `url("${imgUrl}")` }}
      />
      <div className={cl.container}>
        <p className={cl.title}>Email</p>
        <div className={cl.line} />
        <p>{auth.currentUser?.email}</p>
      </div>
      <div className={cl.container}>
        <p className={cl.title}>Statistics</p>
        <div className={cl.line} />
        <StatisticsItem name={"My boards"} item={userBoards?.length} />
        <StatisticsItem name={"Shared boards"} item={sharedBoards?.length} />
        <StatisticsItem name={"Tasks"} item={tasks?.length} />
      </div>
    </ModalWrapper>
  );
});
