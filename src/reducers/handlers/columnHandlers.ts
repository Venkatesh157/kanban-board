import {
  AddColumnPayload,
  BoardState,
  RemoveColumnPayload,
  RenameColumnPayload,
} from "@/types/board";

const handleAddColumn = (
  state: BoardState,
  payload: AddColumnPayload
): BoardState => {
  const { columnId, name } = payload;

  // Prevent overwriting existing columns
  if (state.columns[columnId]) return state;

  return {
    ...state,
    columns: {
      ...state.columns,
      [columnId]: {
        columnId,
        name,
        taskIds: [],
      },
    },
    columnOrder: [...state.columnOrder, columnId],
  };
};

const handleRenameColumn = (
  state: BoardState,
  payload: RenameColumnPayload
): BoardState => {
  const { columnId, text } = payload;

  if (!state.columns[columnId]) return state;

  return {
    ...state,
    columns: {
      ...state.columns,
      [columnId]: {
        ...state.columns[columnId],
        name: text,
      },
    },
  };
};

const handleRemoveColumn = (
  state: BoardState,
  payload: RemoveColumnPayload
): BoardState => {
  const { columnId } = payload;

  if (!state.columns[columnId]) return state;

  const { [columnId]: _, ...restColumns } = state.columns;
  const newColumnOrder = state.columnOrder.filter((id) => id !== columnId);
  const taskIdsToRemove = state.columns[columnId].taskIds;
  const newTasks = { ...state.tasks };
  taskIdsToRemove.forEach((taskId) => delete newTasks[taskId]);

  return {
    ...state,
    columns: restColumns,
    tasks: newTasks,
    columnOrder: newColumnOrder,
  };
};

export { handleAddColumn, handleRenameColumn, handleRemoveColumn };
