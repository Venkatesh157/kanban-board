import { BoardState } from "@/types/board";

export const DEFAULT_COLUMNS = [
  { id: "col-1", name: "To Do" },
  { id: "col-2", name: "In Progress" },
  { id: "col-3", name: "Done" },
];

export const INITIAL_BOARD_STATE: BoardState = {
  columns: {
    "col-1": { columnId: "col-1", name: "To Do", taskIds: [] },
    "col-2": { columnId: "col-2", name: "In Progress", taskIds: [] },
    "col-3": { columnId: "col-3", name: "Done", taskIds: [] },
  },
  tasks: {},
  columnOrder: ["col-1", "col-2", "col-3"],
};

export const getInitialBoardState = (): BoardState => {
  return JSON.parse(JSON.stringify(INITIAL_BOARD_STATE));
};
