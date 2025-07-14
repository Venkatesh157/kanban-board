import { Column as ColumnType, Task as TaskType } from "@/types/board";
import {
  Box,
  Heading,
  VStack,
  StackSeparator,
  Flex,
  Button,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import TaskCard from "./TaskCard";
import ColumnModal from "../modals/ColumnModal";
import TaskModal from "../modals/TaskModal";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

type Props = {
  column: ColumnType;
  tasks: TaskType[];
};

const Column = ({ column, tasks }: Props) => {
  return (
    <Box
      w="300px"
      bg="gray.50"
      borderRadius="lg"
      p={4}
      shadow="md"
      minH="600px"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">{column.name}</Heading>
        <ColumnModal
          mode="rename"
          columnId={column.columnId}
          intialName={column.name}
          triggerLabel={() => {
            return (
              <Icon size="lg" color="tomato">
                <FiEdit />
              </Icon>
            );
          }}
        />
        <ColumnModal
          mode="delete"
          columnId={column.columnId}
          intialName={column.name}
          triggerLabel={() => {
            return (
              <Icon size="lg" color="tomato">
                <MdDelete />
              </Icon>
            );
          }}
        />
      </Flex>

      <VStack separator={<StackSeparator />}>
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
            return <Button>Add Task</Button>;
          }}
        />
      </Box>
    </Box>
  );
};

export default Column;
