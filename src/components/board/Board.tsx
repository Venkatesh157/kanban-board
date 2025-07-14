"use client";
import { useBoardContext } from "@/context/BoardContext";
import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import Column from "./Column";
import ColumnModal from "../modals/ColumnModal";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

function Board() {
  const { state, dispatch } = useBoardContext();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (destination.droppableId === source.droppableId) {
      dispatch({
        type: "REORDER_TASKS",
        payload: {
          columnId: source.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        },
      });
    } else {
      dispatch({
        type: "MOVE_TASK",
        payload: {
          fromColumnId: source.droppableId,
          toColumnId: destination.droppableId,
          taskId: draggableId,
          destinationIndex: destination.index,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex mb={4}>
        <ColumnModal
          mode="add"
          triggerLabel={() => {
            return <Button>Add Column</Button>;
          }}
        />
      </Flex>
      <Flex
        overflowX="auto"
        minH="100vh"
        p={6}
        gap={6}
        wrap="nowrap"
        align="flex-start"
      >
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
          return (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Column key={columnId} column={column} tasks={tasks} />;
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </Flex>
    </DragDropContext>
  );
}

export default Board;
