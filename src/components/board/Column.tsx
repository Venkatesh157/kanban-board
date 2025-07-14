import { Column as ColumnType, Task as TaskType } from "@/types/board";
import {
  Box,
  Heading,
  VStack,
  StackSeparator,
  Flex,
  Button,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import TaskCard from "./TaskCard";
import ColumnModal from "../modals/ColumnModal";
import TaskModal from "../modals/TaskModal";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useBoardContext } from "@/context/BoardContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useColorModeValue } from "../ui/color-mode";
import { Tooltip } from "../ui/tooltip";

type Props = {
  column: ColumnType;
  tasks: TaskType[];
};

const Column = ({ column, tasks }: Props) => {
  const { state, dispatch } = useBoardContext();

  const index = state.columnOrder.indexOf(column.columnId);
  const canMoveLeft = index > 0;
  const canMoveRight = index < state.columnOrder.length - 1;

  const moveColumn = (direction: "left" | "right") => {
    const sourceIndex = index;
    const destinationIndex = direction === "left" ? index - 1 : index + 1;

    dispatch({
      type: "REORDER_COLUMNS",
      payload: { sourceIndex, destinationIndex },
    });
  };

  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      w={["100%", "320px"]}
      bg={bgColor}
      borderRadius="lg"
      tabIndex={0}
      border="1px solid"
      borderColor={borderColor}
      p={4}
      shadow="md"
      minH="600px"
      role="region"
      aria-labelledby={`column-${column.columnId}`}
      _focus={{
        outline: "2px solid",
        outlineColor: "blue.300",
        outlineOffset: "4px",
      }}
      display="flex"
      flexDirection="column"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading
          id={`column-${column.columnId}`}
          size="md"
          fontWeight="semibold"
        >
          {column.name}
        </Heading>
        <Flex gap={1} align="center">
          {canMoveLeft && (
            <Tooltip content="Move column left" aria-label="Move left">
              <IconButton
                size="sm"
                aria-label="Move column left"
                onClick={() => moveColumn("left")}
                variant="ghost"
              >
                <FaArrowLeft />
              </IconButton>
            </Tooltip>
          )}
          {canMoveRight && (
            <Tooltip content="Move column Right" aria-label="Move Right">
              <IconButton
                size="sm"
                aria-label="Move column Right"
                onClick={() => moveColumn("right")}
                variant="ghost"
              >
                <FaArrowRight />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip content="Rename column">
            <ColumnModal
              mode="rename"
              columnId={column.columnId}
              intialName={column.name}
              triggerLabel={() => {
                return (
                  <IconButton
                    aria-label="Rename column"
                    size="sm"
                    variant="ghost"
                    color="tomato"
                  >
                    <FiEdit />
                  </IconButton>
                );
              }}
            />
          </Tooltip>
          <Tooltip content="Delete column">
            <ColumnModal
              mode="delete"
              columnId={column.columnId}
              intialName={column.name}
              triggerLabel={() => {
                return (
                  <IconButton
                    aria-label="Delete column"
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                  >
                    <MdDelete />
                  </IconButton>
                );
              }}
            />
          </Tooltip>
        </Flex>
      </Flex>
      <VStack
        separator={<StackSeparator />}
        gap={3}
        align="stretch"
        role="list"
        aria-label={`Tasks in ${column.name}`}
        flex="1"
        overflowY="auto"
      >
        {tasks.map((task, index) => (
          <TaskCard
            key={task.taskId}
            task={task}
            columnId={column.columnId}
            index={index}
          />
        ))}
      </VStack>
      <Box mt={4}>
        <TaskModal
          columnId={column.columnId}
          mode="add"
          triggerLabel={() => {
            return (
              <Button
                width="100%"
                size="sm"
                colorScheme="blue"
                aria-label="Add task"
              >
                Add Task
              </Button>
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default Column;
