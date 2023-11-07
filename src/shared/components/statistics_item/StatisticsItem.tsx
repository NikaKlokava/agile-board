import { memo } from "react";
import cl from "./statistics_item.module.css";

type Props = {
  name: string;
  item: number;
};

export const StatisticsItem = memo(({ name, item }: Props) => {
  return (
    <div className={cl.statistics_item}>
      <p>{name}</p>
      <p>{item || 0}</p>
    </div>
  );
});
