import { baseBoardState, mockTasks } from "@/__mocks__/boardMock";
import {
  handleAddTask,
  handleDeleteTask,
  handleEditTask,
  handleMoveTask,
  handleReorderTasks,
} from "@/reducers/handlers/taskHandlers";

describe("taskHandlers", () => {
  it("should add a task to column", () => {
    const newTask = {
      taskId: "task-3",
      title: "New Task - 3",
      description: "testing add task",
      comments: [],
    };

    // const clonedState = JSON.parse(JSON.stringify(baseBoardState));

    const newState = handleAddTask(baseBoardState, {
      columnId: "col-1",
      task: newTask,
    });

    expect(newState.tasks["task-3"]).toBeDefined();
    expect(newState.columns["col-1"].taskIds).toContain("task-3");
  });

  it("should edit an existing task", () => {
    const editedTask = {
      ...mockTasks["task-1"],
      title: "Updated Title",
    };

    const newState = handleEditTask(baseBoardState, {
      columnId: "col-1",
      task: editedTask,
    });

    expect(newState.tasks["task-1"].title).toBe("Updated Title");
  });

  it("should delete a task from column", () => {
    const clonedState = JSON.parse(JSON.stringify(baseBoardState));

    const newState = handleDeleteTask(clonedState, {
      columnId: "col-1",
      taskId: "task-1",
    });

    expect(newState.tasks["task-1"]).toBeUndefined();
    expect(newState.columns["col-1"].taskIds).not.toContain("task-1");
  });

  it("should move a task between columns", () => {
    const newState = handleMoveTask(baseBoardState, {
      fromColumnId: "col-1",
      toColumnId: "col-2",
      taskId: "task-1",
      destinationIndex: 1,
    });

    expect(newState.columns["col-1"].taskIds).not.toContain("task-1");
    expect(newState.columns["col-2"].taskIds).toContain("task-1");
  });

  it("should reorder tasks within the same column", () => {
    const columnWithTasks = {
      ...baseBoardState,
      columns: {
        ...baseBoardState.columns,
        "col-1": {
          ...baseBoardState.columns["col-1"],
          taskIds: ["task-1", "task-2"],
        },
      },
    };

    const newState = handleReorderTasks(columnWithTasks, {
      columnId: "col-1",
      sourceIndex: 0,
      destinationIndex: 1,
    });

    expect(newState.columns["col-1"].taskIds).toEqual(["task-2", "task-1"]);
  });
});
