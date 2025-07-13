import { baseBoardState, initialComment } from "@/__mocks__/boardMock";
import {
  handleAddComment,
  handleDeleteComment,
  handleEditComment,
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
});
