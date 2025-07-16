import { baseBoardState, initialComment } from "@/__mocks__/boardMock";
import {
  handleAddComment,
  handleDeleteComment,
  handleEditComment,
  handleReplyComment,
} from "@/reducers/handlers/commentHandlers";

describe("commentHandlers", () => {
  it("should add a comment to task", () => {
    const newState = handleAddComment(baseBoardState, {
      taskId: "task-1",
      comment: "New comment",
    });

    expect(newState.tasks["task-1"].comments.length).toBe(2);
    expect(newState.tasks["task-1"].comments[1].comment).toBe("New comment");
  });

  it("should edit a comment on a task", () => {
    const newState = handleEditComment(baseBoardState, {
      taskId: "task-1",
      commentId: initialComment.commentId,
      text: "Updated comment",
    });

    expect(newState.tasks["task-1"].comments[0].comment).toBe(
      "Updated comment"
    );
  });

  it("should delete a comment from a task", () => {
    const newState = handleDeleteComment(baseBoardState, {
      taskId: "task-1",
      commentId: "comment-1",
    });

    expect(newState.tasks["task-1"].comments).toHaveLength(0);
  });

  it("should handle nested replies", () => {
    let state = handleReplyComment(baseBoardState, {
      taskId: "task-1",
      commentId: "comment-1",
      replyText: "First reply",
    });

    const replyId = state.tasks["task-1"].comments[0].replies![0].commentId;

    state = handleReplyComment(state, {
      taskId: "task-1",
      commentId: replyId,
      replyText: "Second level",
    });

    expect(
      state.tasks["task-1"].comments[0].replies?.[0].replies?.[0].comment
    ).toBe("Second level");

    const nestedId =
      state.tasks["task-1"].comments[0].replies![0].replies![0].commentId;

    state = handleEditComment(state, {
      taskId: "task-1",
      commentId: nestedId,
      text: "Updated nested",
    });

    expect(
      state.tasks["task-1"].comments[0].replies?.[0].replies?.[0].comment
    ).toBe("Updated nested");

    state = handleDeleteComment(state, {
      taskId: "task-1",
      commentId: nestedId,
    });

    expect(state.tasks["task-1"].comments[0].replies![0].replies).toHaveLength(
      0
    );
  });

  it("should not change state when taskId is unknown", () => {
    const newState = handleAddComment(baseBoardState, {
      taskId: "unknown-task",
      comment: "Should not be added",
    });

    expect(newState).toBe(baseBoardState);
  });
});
