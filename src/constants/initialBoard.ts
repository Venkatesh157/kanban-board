import { BoardState } from "@/types/board";
import { v4 as uuidv4 } from "uuid";

export const DEFAULT_COLUMNS = [
  { name: "To Do" },
  { name: "In Progress" },
  { name: "Done" },
];

export const getInitialBoardState = (): BoardState => {
  const columns: BoardState["columns"] = {};
  const columnOrder: string[] = [];

  DEFAULT_COLUMNS.forEach(({ name }) => {
    const columnId = uuidv4();
    columns[columnId] = {
      columnId,
      name,
      taskIds: [],
    };
    columnOrder.push(columnId);
  });

  return {
    columns,
    columnOrder,
    tasks: {},
  };
};
