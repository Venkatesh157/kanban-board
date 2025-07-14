"use client";
import { ReactNode, useRef, useState } from "react";
import BoardModal from "../ui/BoardModal";
import { Task } from "@/types/board";
import { v4 as uuidv4 } from "uuid";
import { useBoardContext } from "@/context/BoardContext";
import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

type Props = {
  mode: "add" | "edit" | "view";
  columnId: string;
  task?: Task;
  triggerLabel: () => ReactNode;
};

const TaskModal = ({ mode, columnId, task, triggerLabel }: Props) => {
  const isEdit = mode === "edit";
  const isReadOnly = mode === "view";
  const { dispatch } = useBoardContext();

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  const [comment, setComment] = useState("");
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  const newTaskIdRef = useRef(uuidv4());

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      taskId: isEdit && task ? task.taskId : newTaskIdRef.current,
      title,
      description,
      comments: task?.comments || [],
    };

    dispatch({
      type: isEdit ? "EDIT_TASK" : "ADD_TASK",
      payload: {
        columnId,
        task: newTask,
      },
    });

    setTitle("");
    setDescription("");
  };

  const handleAddComment = () => {
    if (!comment.trim() || !task) return;

    dispatch({
      type: "ADD_COMMENT",
      payload: {
        taskId: task.taskId,
        comment,
      },
    });

    setComment("");
  };

  const handleEditComment = (commentId: string, text: string) => {
    if (!task) return;

    dispatch({
      type: "EDIT_COMMENT",
      payload: {
        taskId: task.taskId,
        commentId,
        text,
      },
    });

    setEditCommentId(null);
    setEditedCommentText("");
  };

  return (
    <BoardModal
      triggerLabel={triggerLabel}
      title={isEdit ? "Edit Task" : "Add Task"}
      onSubmit={handleSubmit}
    >
      <Input
        mb={4}
        placeholder="Task title"
        value={title}
        readOnly={isReadOnly}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Task description"
        value={description}
        readOnly={isReadOnly}
        onChange={(e) => setDescription(e.target.value)}
      />

      {(isEdit || isReadOnly) && task && (
        <Box mt={6}>
          <Text fontWeight="semibold" mb={2}>
            Comments
          </Text>
          <Stack>
            {task.comments.length === 0 && (
              <Text fontSize="sm" color="gray.500">
                No comments yet.
              </Text>
            )}

            {task.comments.map((c) =>
              editCommentId === c.commentId ? (
                <Box key={c.commentId}>
                  <Textarea
                    size="sm"
                    value={editedCommentText}
                    onChange={(e) => setEditedCommentText(e.target.value)}
                    mb={2}
                  />
                  <Button
                    size="xs"
                    colorScheme="green"
                    mr={2}
                    onClick={() =>
                      handleEditComment(c.commentId, editedCommentText)
                    }
                  >
                    Save
                  </Button>
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => {
                      setEditCommentId(null);
                      setEditedCommentText("");
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Flex
                  key={c.commentId}
                  justify="space-between"
                  align="center"
                  bg="gray.100"
                  p={2}
                  borderRadius="md"
                  fontSize="sm"
                >
                  <Text>{c.comment}</Text>
                  {isEdit && (
                    <Button
                      size="xs"
                      onClick={() => {
                        setEditCommentId(c.commentId);
                        setEditedCommentText(c.comment);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                </Flex>
              )
            )}
          </Stack>

          {isEdit && (
            <>
              {/* <Divider my={4} /> */}
              <Textarea
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                mb={2}
              />
              <Button size="sm" onClick={handleAddComment} colorScheme="blue">
                Add Comment
              </Button>
            </>
          )}
        </Box>
      )}
    </BoardModal>
  );
};

export default TaskModal;
