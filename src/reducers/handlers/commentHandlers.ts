import {
  AddCommentPayload,
  BoardState,
  DeleteCommentPayload,
  EditCommentPayload,
  ReplyCommentPayload,
  Comment,
} from "@/types/board";
import { v4 as uuidv4 } from "uuid";

const addReplyRecursive = (
  comments: Comment[],
  targetId: string,
  reply: Comment
): Comment[] => {
  return comments.map((c) => {
    if (c.commentId === targetId) {
      return {
        ...c,
        replies: [...(c.replies || []), reply],
      };
    }
    if (c.replies) {
      return { ...c, replies: addReplyRecursive(c.replies, targetId, reply) };
    }
    return c;
  });
};

const editCommentRecursive = (
  comments: Comment[],
  targetId: string,
  text: string
): Comment[] => {
  return comments.map((c) => {
    if (c.commentId === targetId) {
      return { ...c, comment: text };
    }
    if (c.replies) {
      return { ...c, replies: editCommentRecursive(c.replies, targetId, text) };
    }
    return c;
  });
};

const deleteCommentRecursive = (
  comments: Comment[],
  targetId: string
): Comment[] => {
  return comments.reduce<Comment[]>((acc, c) => {
    if (c.commentId === targetId) return acc;
    const updatedReplies = c.replies
      ? deleteCommentRecursive(c.replies, targetId)
      : c.replies;
    acc.push({ ...c, replies: updatedReplies });
    return acc;
  }, []);
};

const handleAddComment = (
  state: BoardState,
  payload: AddCommentPayload
): BoardState => {
  const { taskId, comment } = payload;
  const task = state.tasks[taskId];

  if (!task) return state;

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

  const updatedComments = editCommentRecursive(task.comments, commentId, text);

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

  const filteredComments = deleteCommentRecursive(task.comments, commentId);

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

  const reply = { commentId: uuidv4(), comment: replyText };
  const updatedComments = addReplyRecursive(task.comments, commentId, reply);

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
