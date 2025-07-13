import {
  AddTaskPayload,
  BoardState,
  DeleteTaskPayload,
  EditTaskPayload,
  MoveTaskPayload,
  ReorderTasksPayload,
} from "@/types/board";

const handleAddTask = (
  state: BoardState,
  payload: AddTaskPayload
): BoardState => {
  const { columnId, task } = payload;

  if (!state.columns[columnId] || state.tasks[task.taskId]) return state;

  return {
    ...state,
    tasks: {
      ...state.tasks,
      [task.taskId]: task,
    },
    columns: {
      ...state.columns,
      [columnId]: {
        ...state.columns[columnId],
        taskIds: [...state.columns[columnId].taskIds, task.taskId],
      },
    },
  };
};

const handleEditTask = (
  state: BoardState,
  payload: EditTaskPayload
): BoardState => {
  const { columnId, task } = payload;

  if (!state.columns[columnId] || !state.tasks[task.taskId]) return state;

  return {
    ...state,
    tasks: {
      ...state.tasks,
      [task.taskId]: task,
    },
  };
};

const handleDeleteTask = (
  state: BoardState,
  payload: DeleteTaskPayload
): BoardState => {
  const { columnId, taskId } = payload;

  if (!state.columns[columnId] || !state.tasks[taskId]) return state;

  const { [taskId]: _, ...restTasks } = state.tasks;

  return {
    ...state,
    tasks: restTasks,
    columns: {
      ...state.columns,
      [columnId]: {
        ...state.columns[columnId],
        taskIds: state.columns[columnId].taskIds.filter((id) => id !== taskId),
      },
    },
  };
};

const handleMoveTask = (
  state: BoardState,
  payload: MoveTaskPayload
): BoardState => {
  const { fromColumnId, toColumId, taskId, destinationIndex } = payload;

  const sourceIds = [...state.columns[fromColumnId].taskIds];
  const destinationIds = [...state.columns[toColumId].taskIds];
  const taskIndex = sourceIds.indexOf(taskId);

  sourceIds.splice(taskIndex, 1);
  destinationIds.splice(destinationIndex, 0, taskId);

  return {
    ...state,
    columns: {
      ...state.columns,
      [fromColumnId]: {
        ...state.columns[fromColumnId],
        taskIds: sourceIds,
      },
      [toColumId]: {
        ...state.columns[toColumId],
        taskIds: destinationIds,
      },
    },
  };
};

const handleReorderTasks = (
  state: BoardState,
  payload: ReorderTasksPayload
) => {
  const { columnId, sourceIndex, destinationIndex } = payload;

  const column = state.columns[columnId];

  const newTasksIds = [...column.taskIds];

  const [movedTask] = newTasksIds.splice(sourceIndex, 1);
  newTasksIds.splice(destinationIndex, 0, movedTask);

  return {
    ...state,
    columns: {
      ...state.columns,
      [columnId]: {
        ...column,
        taskIds: newTasksIds,
      },
    },
  };
};

export {
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
  handleMoveTask,
  handleReorderTasks,
};
