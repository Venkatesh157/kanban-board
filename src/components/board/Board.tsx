"use client";
import { useBoardContext } from "@/context/BoardContext";
import { Flex } from "@chakra-ui/react";
import React from "react";
import Column from "./Column";

function Board() {
  const { state } = useBoardContext();

  return (
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
        return <Column key={columnId} column={column} tasks={tasks} />;
      })}
    </Flex>
  );
}

export default Board;
