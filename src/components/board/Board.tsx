"use client";
import { useBoardContext } from "@/context/BoardContext";
import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import Column from "./Column";
import ColumnModal from "../modals/ColumnModal";

function Board() {
  const { state } = useBoardContext();

  return (
    <div>
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
          return <Column key={columnId} column={column} tasks={tasks} />;
        })}
      </Flex>
    </div>
  );
}

export default Board;
