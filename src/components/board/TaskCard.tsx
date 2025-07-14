"use client";
import { Task } from "@/types/board";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import TaskModal from "../modals/TaskModal";
import { IoEyeSharp } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { Draggable } from "@hello-pangea/dnd";
import { Tooltip } from "../ui/tooltip";
import { useColorModeValue } from "../ui/color-mode";

type Props = {
  task: Task;
  columnId: string;
  index: number;
};

const TaskCard = ({ task, columnId, index }: Props) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const cardHoverShadow = useColorModeValue("md", "lg");

  return (
    <Draggable draggableId={task.taskId} index={index}>
      {(provided) => (
        <Box
          p={4}
          bg={cardBg}
          borderRadius="md"
          shadow="sm"
          _hover={{ shadow: cardHoverShadow }}
          cursor="grab"
          tabIndex={0}
          role="group"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontWeight="bold">{task.title}</Text>
            <Flex gap={2}>
              <Tooltip content="View Task" aria-label="View Task">
                <TaskModal
                  mode="view"
                  task={task}
                  columnId={columnId}
                  triggerLabel={() => (
                    <IconButton
                      size="lg"
                      aria-label="View Task"
                      variant="ghost"
                    >
                      <IoEyeSharp />
                    </IconButton>
                  )}
                />
              </Tooltip>
              <Tooltip content="Edit Task" aria-label="Edit Task">
                <TaskModal
                  mode="edit"
                  columnId={columnId}
                  task={task}
                  triggerLabel={() => (
                    <IconButton
                      aria-label="Edit Task"
                      variant="ghost"
                      size="sm"
                    >
                      <FiEdit />
                    </IconButton>
                  )}
                />
              </Tooltip>
            </Flex>
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
