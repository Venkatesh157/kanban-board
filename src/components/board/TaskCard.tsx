"use client";
import { Task } from "@/types/board";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import TaskModal from "../modals/TaskModal";
import { Draggable } from "@hello-pangea/dnd";
import { Tooltip } from "../ui/tooltip";
import { useColorModeValue } from "../ui/colorMode";
import { MdDelete, MdOpenInNew } from "react-icons/md";

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
                  mode="edit"
                  task={task}
                  columnId={columnId}
                  triggerLabel={() => (
                    <IconButton
                      size="lg"
                      aria-label="Edit Task"
                      variant="ghost"
                    >
                      <MdOpenInNew />
                    </IconButton>
                  )}
                />
              </Tooltip>
              <Tooltip content="Delete Task" aria-label="Delete Task">
                <TaskModal
                  mode="delete"
                  columnId={columnId}
                  task={task}
                  triggerLabel={() => (
                    <IconButton
                      aria-label="Delete Task"
                      variant="ghost"
                      size="sm"
                      color="red"
                    >
                      <MdDelete />
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
