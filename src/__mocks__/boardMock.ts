import { BoardState, Column, Comment, Task } from "@/types/board";

// Task Comments
export const initialComment: Comment = {
  commentId: "comment-1",
  comment: "Initial comment",
};

// Tasks
export const mockTasks: Record<string, Task> = {
  "task-1": {
    taskId: "task-1",
    title: "First Task",
    description: "This is the First task",
    comments: [initialComment],
  },
  "task-2": {
    taskId: "task-2",
    title: "Second Task",
    description: "Second task description",
    comments: [],
  },
};

// Columns
export const mockColumns: Record<string, Column> = {
  "col-1": {
    columnId: "col-1",
    name: "To Do",
    taskIds: ["task-1"],
  },
  "col-2": {
    columnId: "col-2",
    name: "In Progress",
    taskIds: ["task-2"],
  },
  "col-3": {
    columnId: "col-3",
    name: "Done",
    taskIds: [],
  },
};

// Board States
export const baseBoardState: BoardState = {
  columns: { ...mockColumns },
  tasks: {
    ...mockTasks,
  },
  columnOrder: ["col-1", "col-2", "col-3"],
};

export const populatedBoardState: BoardState = {
  columns: { ...mockColumns },
  tasks: { ...mockTasks },
  columnOrder: ["col-1"],
};

export const emptyBoardState: BoardState = {
  columns: {
    "col-1": {
      columnId: "col-1",
      name: "To Do",
      taskIds: [],
    },
  },
  tasks: {},
  columnOrder: ["col-1"],
};
