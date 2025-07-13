import { baseBoardState, populatedBoardState } from "@/__mocks__/boardMock";
import {
  handleAddColumn,
  handleRemoveColumn,
  handleRenameColumn,
} from "@/reducers/handlers/columnHandlers";

describe("Column Headers", () => {
  it("should add a column", () => {
    const newState = handleAddColumn(baseBoardState, {
      columnId: "col-2",
      name: "In Progress",
    });

    expect(newState.columns["col-2"]).toBeDefined();
  });

  it("should rename a column", () => {
    const renamed = handleRenameColumn(populatedBoardState, {
      columnId: "col-1",
      text: "Backlog",
    });

    expect(renamed.columns["col-1"].name).toBe("Backlog");
  });

  it("should remove a column and its tasks", () => {
    const removed = handleRemoveColumn(populatedBoardState, {
      columnId: "col-1",
    });

    expect(removed.columns["col-1"]).toBeUndefined();
    expect(removed.tasks["task-1"]).toBeUndefined();
    expect(removed.columnOrder).not.toContain("col-1");
  });
});
