"use client";
import { useBoardContext } from "@/context/BoardContext";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  Stack,
  StackSeparator,
} from "@chakra-ui/react";
import React from "react";
import Column from "./Column";
import ColumnModal from "../modals/ColumnModal";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { ColorModeButton } from "../ui/colorMode";

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
    <Box as="main" bg="gray.100" _dark={{ bg: "gray.900" }} minH="100vh">
      {/* Header */}
      <Box
        px={[4, 6, 10]}
        py={4}
        borderBottom="1px solid"
        borderColor="gray.200"
        _dark={{ borderColor: "gray.700", bg: "gray.800" }}
        bg="white"
        position="sticky"
        top={0}
        zIndex="banner"
      >
        <Flex align="center">
          <Heading as="h1" size="lg">
            Kanban Board
          </Heading>
          <Spacer />
          <Stack direction="row" separator={<StackSeparator />}>
            <ColumnModal
              mode="add"
              triggerLabel={() => (
                <Button colorScheme="blue" size="sm" px="4">
                  Add Column
                </Button>
              )}
            />
            <ColorModeButton />
          </Stack>
        </Flex>
      </Box>
      <Container maxW="full" px={[4, 6, 10]} py={6}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Flex
            overflowX="auto"
            minH="calc(100vh - 96px)"
            p={6}
            gap={6}
            wrap="nowrap"
            align="flex-start"
            role="list"
            aria-label="Kanban Columns"
          >
            {state.columnOrder.map((columnId) => {
              const column = state.columns[columnId];
              const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
              return (
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided) => (
                    <Box ref={provided.innerRef} {...provided.droppableProps}>
                      <Column key={columnId} column={column} tasks={tasks} />
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              );
            })}
          </Flex>
        </DragDropContext>
      </Container>
    </Box>
  );
}

export default Board;
