import { FieldArray, Form, Formik } from "formik";
import { Button } from "../../../../shared/components/button";
import { FieldName } from "../../../../shared/components/field_name";
import { Input } from "../../../../shared/components/input";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { EditBoardSchema } from "../../../../utils/utils";
import { AddBtn } from "../../../../shared/components/add_button";
import { updateBoard } from "../../../../redux/reducers/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hook";
import { updateUserBoardData } from "../../../../redux/thunk/saveDataThunk";
import cl from "./modal_styles.module.css";
import { CloseIcon } from "../../../../shared/components/close_icon/CloseIcon";

type Props = {
  onClose: () => void;
};

export const EditBoardModal = ({ onClose }: Props) => {
  const activeBoard = useAppSelector((state) => state.activeBoard);

  const dispatch = useAppDispatch();

  const onSubmit = (updatedBoard: UpdateBoardAction) => {
    updatedBoard.usersEmail.unshift(activeBoard.usersEmail[0]);

    dispatch(updateBoard(updatedBoard));
    dispatch(updateUserBoardData(updatedBoard));
    onClose();
  };
  const initialUsersEmail = activeBoard.usersEmail.filter(
    (email) => activeBoard.usersEmail[0] !== email
  );

  const initialData = {
    name: activeBoard.name,
    columns: activeBoard?.columns?.reduce((accum: string[], current) => {
      return [...accum, current.title];
    }, []),
    uuid: activeBoard.uuid,
    usersEmail: initialUsersEmail,
  };

  const uuids = activeBoard?.columns?.reduce(
    (accum: string[], current): string[] => {
      return [...accum, current.uuid!];
    },
    []
  );

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={initialData}
        validationSchema={EditBoardSchema}
        onSubmit={(values) => {
          const columns = values.columns
            ?.filter((column) => column && column.trimStart().length !== 0)
            ?.map((column) => column.trimStart());

          const newColumns = columns.reduce(
            (accum: { title: string; uuid: string }[], curr, i) => {
              const newColumn = {
                title: curr,
                uuid: uuids && uuids[i] ? uuids[i] : uuidv4(),
              };
              return [...accum, newColumn];
            },
            []
          );
          onSubmit({
            ...values,
            columns: newColumns,
            time: activeBoard.time,
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
            <CloseIcon onClose={onClose} />
            <h2 className={cl.modal_title} data-testid="edit-board-modal">
              Edit Board
            </h2>
            <div className={cl.board_creator_container}>
              <p className={cl.subtitle}>Board Creator</p>
              <p className={cl.subtitle}>{activeBoard.usersEmail?.[0]}</p>
            </div>
            <FieldName formikName={"name"} fieldName={"Board name"} />
            {props.errors.name && props.touched.name && (
              <p style={{ color: "red" }}>{props.errors.name}</p>
            )}
            <FieldArray
              name="columns"
              render={(arrayHelpers) => (
                <>
                  <div className={cl.container}>
                    <p className={cl.title}>Board Columns</p>
                    {props.values.columns?.map((_, index) => (
                      <Input
                        key={index}
                        formikName={`columns[${index}]`}
                        remove={arrayHelpers.remove}
                        index={index}
                        uuids={uuids}
                      />
                    ))}
                  </div>
                  <AddBtn
                    add={arrayHelpers.push}
                    text="Add New Column"
                    testid={"add-new-column-btn"}
                  />
                </>
              )}
            />
            <FieldArray
              name="usersEmail"
              render={(arrayHelpers) => (
                <>
                  <div className={cl.container}>
                    <p className={cl.title}>Board Members</p>
                    {props.values.usersEmail?.map((_, index) => (
                      <Input
                        key={index}
                        formikName={`usersEmail[${index}]`}
                        remove={arrayHelpers.remove}
                        index={index}
                        type="email"
                      />
                    ))}
                  </div>
                  <AddBtn
                    add={arrayHelpers.push}
                    text="Add New Member"
                    testid={"add-new-member-btn"}
                  />
                </>
              )}
            />
            <Button
              text={"Save Changes"}
              withIcon={false}
              newClass="center"
              testid={"save-changes-btn"}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};
