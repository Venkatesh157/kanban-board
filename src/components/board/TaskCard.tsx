"use client";
import { Task } from "@/types/board";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import TaskModal from "../modals/TaskModal";
import { IoEyeSharp } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";

type Props = {
  task: Task;
  columnId: string;
};

const TaskCard = ({ task, columnId }: Props) => {
  return (
    <>
      <Box
        p={4}
        bg="white"
        borderRadius="md"
        shadow="sm"
        _hover={{ shadow: "md" }}
        cursor="pointer"
      >
        <Flex justify="space-between" align="center" mb={2}>
          <Text fontWeight="bold">{task.title}</Text>
          <TaskModal
            mode="view"
            task={task}
            columnId={columnId}
            triggerLabel={() => (
              <Icon size="lg" color="tomato">
                <IoEyeSharp />
              </Icon>
            )}
          />
          <TaskModal
            mode="edit"
            columnId={columnId}
            task={task}
            triggerLabel={() => (
              <Icon size="lg" color="tomato">
                <FiEdit />
              </Icon>
            )}
          />
        </Flex>
        {task.description && (
          <Text fontSize="sm" color="gray.500" mt={1}>
            {task.description}
          </Text>
        )}
      </Box>
    </>
  );
};

export default TaskCard;
