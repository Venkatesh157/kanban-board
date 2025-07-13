import { Task } from "@/types/board";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <Box
      p={4}
      bg="white"
      borderRadius="md"
      shadow="sm"
      _hover={{ shadow: "md" }}
      cursor="pointer"
    >
      <Text fontWeight="semibold">{task.title}</Text>
      {task.description && (
        <Text fontSize="sm" color="gray.500" mt={1}>
          {task.description}
        </Text>
      )}
    </Box>
  );
};

export default TaskCard;
