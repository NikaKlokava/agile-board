import { memo } from "react";
import { Button } from "../button";

type Props = {
  text: string;
  testid: string;
  add: any;
};

export const AddBtn = memo(({ text, testid, add }: Props) => {
  return (
    <Button
      text={text}
      withIcon={true}
      testid={testid}
      onClick={() => add("")}
      type="button"
    />
  );
});
