"use client";
import { ReactNode, useState } from "react";
import BoardModal from "../ui/BoardModal";
import { Task } from "@/types/board";
import { v4 as uuidv4 } from "uuid";
import { useBoardContext } from "@/context/BoardContext";
import {
  Box,
  Flex,
  IconButton,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import CommentSection from "../ui/CommentSection";
import InlineEditor from "../ui/InlineEditor";
import { FiEdit } from "react-icons/fi";

type Props = {
  mode: "add" | "edit" | "view" | "delete";
  columnId: string;
  task?: Task;
  triggerLabel: () => ReactNode;
};

const TaskModal = ({ mode, columnId, task, triggerLabel }: Props) => {
  const { dispatch } = useBoardContext();
  const isView = mode === "view";
  const isAdd = mode === "add";
  const isDelete = mode === "delete";

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);

  const bgColor = useColorModeValue("white", "gray.800");

  const handleAddTask = () => {
    if (!title.trim()) return;
    const newTask: Task = {
      taskId: uuidv4(),
      title,
      description,
      comments: [],
    };
    dispatch({
      type: "ADD_TASK",
      payload: {
        columnId,
        task: newTask,
      },
    });
  };

  const saveTitle = () => {
    dispatch({
      type: "EDIT_TASK",
      payload: {
        columnId,
        task: { ...task!, title },
      },
    });
    setEditTitle(false);
  };

  const saveDescription = () => {
    dispatch({
      type: "EDIT_TASK",
      payload: {
        columnId,
        task: { ...task!, description },
      },
    });
    setEditDescription(false);
  };

  const deleteTask = () => {
    if (!task?.taskId) return;
    dispatch({
      type: "DELETE_TASK",
      payload: {
        columnId,
        taskId: task?.taskId,
      },
    });
  };

  return (
    <BoardModal
      triggerLabel={triggerLabel}
      title={isAdd ? "Add New Task" : "Task Details"}
      onSubmit={isAdd ? handleAddTask : isDelete ? deleteTask : null}
    >
      <VStack gap={8} align="stretch" bg={bgColor}>
        {isDelete ? (
          <>
            <Text>Are you sure you want to delete the task?</Text>
          </>
        ) : (
          <Box>
            <Flex justify="space-between" align="center"></Flex>
            <Text fontSize="lg" fontWeight="bold">
              {isAdd && (
                <VStack gap={4} align="flex-start">
                  <Text>Task Title</Text>
                  <Input
                    id="task-title"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    padding={2}
                  />
                  <Text>Task Description</Text>
                  <Textarea
                    id="task-description"
                    placeholder="Enter task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    padding={2}
                  />
                </VStack>
              )}
              {!isAdd && (
                <>
                  <Box>
                    <Text fontSize="lg" fontWeight="bold">
                      {editTitle ? (
                        <InlineEditor
                          value={title}
                          onChange={setTitle}
                          onSave={saveTitle}
                          onCancel={() => setEditTitle(false)}
                        />
                      ) : (
                        <>
                          {title}
                          {!isView && (
                            <IconButton
                              aria-label="Edit title"
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditTitle(true)}
                              ml={2}
                            >
                              <FiEdit />
                            </IconButton>
                          )}
                        </>
                      )}
                    </Text>
                  </Box>
                  <Box>
                    <Flex align="center" justify="space-between">
                      <Text fontWeight="semibold">Task Description</Text>
                      {!editDescription && !isView && (
                        <IconButton
                          aria-label="Edit title"
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditDescription(true)}
                          ml={2}
                        >
                          <FiEdit />
                        </IconButton>
                      )}
                    </Flex>
                    {editDescription ? (
                      <InlineEditor
                        value={description}
                        onChange={setDescription}
                        onSave={saveDescription}
                        onCancel={() => setEditDescription(false)}
                        isTextarea
                      />
                    ) : (
                      <Text mt={2}>
                        {description || "No description provided."}
                      </Text>
                    )}
                  </Box>
                </>
              )}
            </Text>
          </Box>
        )}

        {!isAdd && !isDelete && task && (
          <CommentSection task={task} isEditable={true} />
        )}
      </VStack>
    </BoardModal>
  );
};

export default TaskModal;
