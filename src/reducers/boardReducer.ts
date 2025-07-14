import { Action, BoardState } from "@/types/board";
import * as columnHandlers from "./handlers/columnHandlers";
import * as taskHandlers from "./handlers/taskHandlers";
import * as commentHandlers from "./handlers/commentHandlers";

export const boardReducer = (state: BoardState, action: Action): BoardState => {
  switch (action.type) {
    case "ADD_COLUMN":
      return columnHandlers.handleAddColumn(state, action.payload);
    case "RENAME_COLUMN":
      return columnHandlers.handleRenameColumn(state, action.payload);
    case "REMOVE_COLUMN":
      return columnHandlers.handleRemoveColumn(state, action.payload);
    case "REORDER_COLUMNS":
      return columnHandlers.handleReorderColumns(state, action.payload);
    case "ADD_TASK":
      return taskHandlers.handleAddTask(state, action.payload);
    case "EDIT_TASK":
      return taskHandlers.handleEditTask(state, action.payload);
    case "DELETE_TASK":
      return taskHandlers.handleDeleteTask(state, action.payload);
    case "MOVE_TASK":
      return taskHandlers.handleMoveTask(state, action.payload);
    case "REORDER_TASKS":
      return taskHandlers.handleReorderTasks(state, action.payload);
    case "ADD_COMMENT":
      return commentHandlers.handleAddComment(state, action.payload);
    case "EDIT_COMMENT":
      return commentHandlers.handleEditComment(state, action.payload);
    case "DELETE_COMMENT":
      return commentHandlers.handleDeleteComment(state, action.payload);

    default:
      return state;
  }
};
