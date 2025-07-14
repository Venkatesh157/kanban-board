"use client";
import { Task } from "@/types/board";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import TaskModal from "../modals/TaskModal";
import { IoEyeSharp } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { Draggable } from "@hello-pangea/dnd";

type Props = {
  task: Task;
  columnId: string;
  index: number;
};

const TaskCard = ({ task, columnId, index }: Props) => {
  return (
    <Draggable draggableId={task.taskId} index={index}>
      {(provided) => (
        <Box
          p={4}
          bg="white"
          borderRadius="md"
          shadow="sm"
          _hover={{ shadow: "md" }}
          cursor="pointer"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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
      )}
    </Draggable>
  );
};

export default TaskCard;
