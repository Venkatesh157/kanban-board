export interface Comment {
  commentId: string;
  comment: string;
}

export interface Task {
  taskId: string;
  title: string;
  description?: string;
  comments: Comment[];
}

export interface Column {
  columnId: string;
  name: string;
  taskIds: string[];
}

export interface BoardState {
  columns: Record<string, Column>;
  tasks: Record<string, Task>;
  columnOrder: string[];
}

export type AddColumnPayload = { columnId: string; name: string };
export type RenameColumnPayload = { columnId: string; text: string };
export type RemoveColumnPayload = { columnId: string };

export type AddTaskPayload = { columnId: string; task: Task };
export type EditTaskPayload = { columnId: string; task: Task };
export type DeleteTaskPayload = { columnId: string; taskId: string };

export type AddCommentPayload = { taskId: string; comment: string };
export type EditCommentPayload = {
  taskId: string;
  commentId: string;
  text: string;
};
export type DeleteCommentPayload = { taskId: string; commentId: string };

export type MoveTaskPayload = {
  fromColumnId: string;
  toColumnId: string;
  taskId: string;
  destinationIndex: number;
};

export type ReorderTasksPayload = {
  columnId: string;
  sourceIndex: number;
  destinationIndex: number;
};

export type Action =
  | { type: "ADD_COLUMN"; payload: AddColumnPayload }
  | { type: "RENAME_COLUMN"; payload: RenameColumnPayload }
  | { type: "REMOVE_COLUMN"; payload: RemoveColumnPayload }
  | { type: "ADD_TASK"; payload: AddTaskPayload }
  | { type: "EDIT_TASK"; payload: EditTaskPayload }
  | { type: "DELETE_TASK"; payload: DeleteTaskPayload }
  | { type: "ADD_COMMENT"; payload: AddCommentPayload }
  | { type: "EDIT_COMMENT"; payload: EditCommentPayload }
  | { type: "DELETE_COMMENT"; payload: DeleteCommentPayload }
  | {
      type: "MOVE_TASK";
      payload: MoveTaskPayload;
    }
  | {
      type: "REORDER_TASKS";
      payload: ReorderTasksPayload;
    };
