import {
  AddCommentPayload,
  BoardState,
  DeleteCommentPayload,
  EditCommentPayload,
  ReplyCommentPayload,
} from "@/types/board";
import { v4 as uuidv4 } from "uuid";

const handleAddComment = (
  state: BoardState,
  payload: AddCommentPayload
): BoardState => {
  const { taskId, comment } = payload;
  const task = state.tasks[taskId];

  if (!taskId) return state;

  const newComment = { commentId: uuidv4(), comment };

  return {
    ...state,
    tasks: {
      ...state.tasks,
      [taskId]: {
        ...task,
        comments: [...task.comments, newComment],
      },
    },
  };
};

const handleEditComment = (state: BoardState, payload: EditCommentPayload) => {
  const { taskId, commentId, text } = payload;
  const task = state.tasks[taskId];
  if (!task) return state;

  const updatedComments = task.comments.map((comment) =>
    comment.commentId === commentId ? { ...comment, comment: text } : comment
  );

  return {
    ...state,
    tasks: {
      ...state.tasks,
      [taskId]: {
        ...task,
        comments: updatedComments,
      },
    },
  };
};

const handleDeleteComment = (
  state: BoardState,
  payload: DeleteCommentPayload
) => {
  const { taskId, commentId } = payload;

  const task = state.tasks[taskId];

  if (!task) return state;

  const filteredComments = task.comments.filter(
    (comment) => comment.commentId !== commentId
  );

  return {
    ...state,
    tasks: {
      ...state.tasks,
      [taskId]: {
        ...task,
        comments: filteredComments,
      },
    },
  };
};

const handleReplyComment = (
  state: BoardState,
  payload: ReplyCommentPayload
) => {
  const { taskId, commentId, replyText } = payload;
  const task = state.tasks[taskId];
  if (!task) return state;

  const updatedComments = task.comments.map((comment) => {
    if (comment.commentId !== commentId) return comment;

    return {
      ...comment,
      replies: [
        ...(comment.replies || []),
        { commentId: uuidv4(), comment: replyText },
      ],
    };
  });

  return {
    ...state,
    tasks: {
      ...state.tasks,
      [taskId]: {
        ...task,
        comments: updatedComments,
      },
    },
  };
};

export {
  handleAddComment,
  handleEditComment,
  handleDeleteComment,
  handleReplyComment,
};
