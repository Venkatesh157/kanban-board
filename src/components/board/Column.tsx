import { Column as ColumnType, Task as TaskType } from "@/types/board";
import { Box, Heading, Stack, StackSeparator } from "@chakra-ui/react";
import React from "react";
import TaskCard from "./TaskCard";

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
      minH="300px"
    >
      <Heading size="md" mb={4}>
        {column.name}
      </Heading>
      <Stack separator={<StackSeparator />}>
        {tasks.map((task) => (
          <TaskCard key={task.taskId} task={task} />
        ))}
      </Stack>
    </Box>
  );
};

export default Column;
