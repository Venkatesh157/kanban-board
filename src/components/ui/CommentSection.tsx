import { Task, Comment } from "@/types/board";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Textarea,
  VisuallyHidden,
} from "@chakra-ui/react";
import { JSX, useState } from "react";
import { useColorModeValue } from "./color-mode";
import { useBoardContext } from "@/context/BoardContext";
import InlineEditor from "./InlineEditor";

type Props = {
  task: Task;
  isEditable: boolean;
};

const CommentSection = ({ task, isEditable }: Props) => {
  const { dispatch } = useBoardContext();
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const commentBg = useColorModeValue("gray.100", "gray.700");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    dispatch({
      type: "ADD_COMMENT",
      payload: {
        taskId: task.taskId,
        comment: newComment,
      },
    });
    setNewComment("");
  };

  const handleEditComment = (commentId: string) => {
    dispatch({
      type: "EDIT_COMMENT",
      payload: { taskId: task.taskId, commentId, text: editedText },
    });
    setEditingCommentId(null);
    setEditedText("");
  };

  const handleReply = (commentId: string) => {
    if (!replyText.trim()) return;
    dispatch({
      type: "ADD_REPLY",
      payload: {
        taskId: task.taskId,
        commentId,
        replyText,
      },
    });
    setReplyToId(null);
    setReplyText("");
  };

  const handleDeleteComment = (commentId: string) => {
    dispatch({
      type: "DELETE_COMMENT",
      payload: { taskId: task.taskId, commentId },
    });
  };

  const renderComments = (comments: Comment[], level = 0): JSX.Element[] => {
    return comments.map((comment) => (
      <Box
        key={comment.commentId}
        bg={commentBg}
        p={3}
        borderRadius="md"
        ml={level * 4}
      >
        {editingCommentId === comment.commentId ? (
          <InlineEditor
            value={editedText}
            onChange={setEditedText}
            onSave={() => handleEditComment(comment.commentId)}
            onCancel={() => setEditingCommentId(null)}
          />
        ) : (
          <>
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="sm">{comment.comment}</Text>
              </Box>

              {isEditable && (
                <Flex gap={2}>
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => {
                      setEditingCommentId(comment.commentId);
                      setEditedText(comment.comment);
                    }}
                    aria-label="Edit comment"
                  >
                    Edit
                  </Button>
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => setReplyToId(comment.commentId)}
                    aria-label="Reply to comment"
                  >
                    Reply
                  </Button>
                  <Button
                    size="xs"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => handleDeleteComment(comment.commentId)}
                    aria-label="Delete comment"
                    color="red"
                  >
                    Delete
                  </Button>
                </Flex>
              )}
            </Flex>
            {replyToId === comment.commentId && (
              <Box mt={2}>
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  size="sm"
                  placeholder="Write a reply..."
                  mb={2}
                  aria-label="Reply input"
                  padding={3}
                />
                <Flex gap={2}>
                  <Button
                    size="xs"
                    colorScheme="blue"
                    onClick={() => handleReply(comment.commentId)}
                    aria-label="Submit reply"
                    px={2}
                  >
                    Reply
                  </Button>
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => {
                      setEditingCommentId(comment.commentId);
                      setEditedText(comment.comment);
                    }}
                    aria-label="Edit comment"
                  >
                    Edit
                  </Button>
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => {
                      setReplyToId(null);
                      setReplyText("");
                    }}
                    aria-label="Cancel reply"
                    px={2}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Box>
            )}
          </>
        )}
        {comment.replies && comment.replies.length > 0 && (
          <Box mt={2}>{renderComments(comment.replies, level + 1)}</Box>
        )}
      </Box>
    ));
  };

  return (
    <Box mt={6} role="region" aria-labelledby="comments-heading">
      <Text id="comments-headings" fontWeight="semibold" mb={3}>
        Comments
      </Text>
      <Stack gap={4}>
        {task.comments.length === 0 ? (
          <Text fontSize="sm" color="gray.500">
            No comments yet
          </Text>
        ) : (
          renderComments(task.comments)
        )}
        {isEditable && (
          <Box mt={4}>
            <VisuallyHidden>
              <label htmlFor="new-comment">New Comment</label>
            </VisuallyHidden>
            <Textarea
              id="new-comment"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              mb={2}
              aria-label="New comment input"
              padding={4}
            />
            <Button
              size="sm"
              onClick={handleAddComment}
              colorScheme="blue"
              aria-label="Add comment"
              px={3}
            >
              Add Comment
            </Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default CommentSection;

// task.comments.map((comment) => (
//             <Box key={comment.commentId} bg={commentBg} p={3} borderRadius="md">
//               {editingCommentId === comment.commentId ? (
//                 <InlineEditor
//                   value={editedText}
//                   onChange={setEditedText}
//                   onSave={() => handleEditComment(comment.commentId)}
//                   onCancel={() => setEditingCommentId(null)}
//                 />
//               ) : (
//                 <>
//                   <Flex justify="space-between" align="center">
//                     <Box>
//                       <Text fontSize="sm">{comment.comment}</Text>
//                     </Box>

//                     {isEditable && (
//                       <Flex gap={2}>
//                         <Button
//                           size="xs"
//                           variant="ghost"
//                           onClick={() => {
//                             setEditingCommentId(comment.commentId);
//                             setEditedText(comment.comment);
//                           }}
//                           aria-label="Edit comment"
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           size="xs"
//                           variant="ghost"
//                           onClick={() => setReplyToId(comment.commentId)}
//                           aria-label="Reply to comment"
//                         >
//                           Reply
//                         </Button>
//                         <Button
//                           size="xs"
//                           variant="ghost"
//                           onClick={() => handleDeleteComment(comment.commentId)}
//                           aria-label="Delete comment"
//                         >
//                           Delete
//                         </Button>
//                       </Flex>
//                     )}
//                   </Flex>
//                   {replyToId === comment.commentId && (
//                     <Box mt={2}>
//                       <Textarea
//                         value={replyText}
//                         onChange={(e) => setReplyText(e.target.value)}
//                         size="sm"
//                         placeholder="Write a reply..."
//                         mb={2}
//                         aria-label="Reply input"
//                         padding={3}
//                       />
//                       <Flex gap={2}>
//                         <Button
//                           size="xs"
//                           colorScheme="blue"
//                           onClick={() => handleReply(comment.commentId)}
//                           aria-label="Submit reply"
//                           px={2}
//                         >
//                           Reply
//                         </Button>
//                         <Button
//                           size="xs"
//                           variant="ghost"
//                           onClick={() => {
//                             setEditingCommentId(comment.commentId);
//                             setEditedText(comment.comment);
//                           }}
//                           aria-label="Edit comment"
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           size="xs"
//                           variant="ghost"
//                           onClick={() => {
//                             setReplyToId(null);
//                             setReplyText("");
//                           }}
//                           aria-label="Cancel reply"
//                           px={2}
//                         >
//                           Cancel
//                         </Button>
//                       </Flex>
//                     </Box>
//                   )}
//                 </>
//               )}
//               {comment.replies &&
//                 comment.replies.map((reply) => (
//                   <Box
//                     key={reply.commentId}
//                     bg={commentBg}
//                     p={3}
//                     borderRadius="md"
//                     ml={6}
//                     mt={2}
//                   >
//                     {editingCommentId === reply.commentId ? (
//                       <InlineEditor
//                         value={editedText}
//                         onChange={setEditedText}
//                         onSave={() => handleEditComment(reply.commentId)}
//                         onCancel={() => setEditingCommentId(null)}
//                       />
//                     ) : (
//                       <>
//                         <Flex justify="space-between" align="center">
//                           <Box>
//                             <Text fontSize="sm">{reply.comment}</Text>
//                           </Box>

//                           {isEditable && (
//                             <Flex gap={2}>
//                               <Button
//                                 size="xs"
//                                 variant="ghost"
//                                 onClick={() => {
//                                   setEditingCommentId(reply.commentId);
//                                   setEditedText(reply.comment);
//                                 }}
//                                 aria-label="Edit reply"
//                               >
//                                 Edit
//                               </Button>
//                               <Button
//                                 size="xs"
//                                 variant="ghost"
//                                 onClick={() => setReplyToId(reply.commentId)}
//                                 aria-label="Reply to reply"
//                               >
//                                 Reply
//                               </Button>
//                               <Button
//                                 size="xs"
//                                 variant="ghost"
//                                 onClick={() =>
//                                   handleDeleteComment(reply.commentId)
//                                 }
//                                 aria-label="Delete reply"
//                               >
//                                 Delete
//                               </Button>
//                             </Flex>
//                           )}
//                         </Flex>
//                         {replyToId === reply.commentId && (
//                           <Box mt={2}>
//                             <Textarea
//                               value={replyText}
//                               onChange={(e) => setReplyText(e.target.value)}
//                               size="sm"
//                               placeholder="Write a reply..."
//                               mb={2}
//                               aria-label="Reply input"
//                               padding={3}
//                             />
//                             <Flex gap={2}>
//                               <Button
//                                 size="xs"
//                                 colorScheme="blue"
//                                 onClick={() => handleReply(reply.commentId)}
//                                 aria-label="Submit reply"
//                                 px={2}
//                               >
//                                 Reply
//                               </Button>
//                               <Button
//                                 size="xs"
//                                 variant="ghost"
//                                 onClick={() => {
//                                   setEditingCommentId(reply.commentId);
//                                   setEditedText(reply.comment);
//                                 }}
//                                 aria-label="Edit reply"
//                               >
//                                 Edit
//                               </Button>
//                               <Button
//                                 size="xs"
//                                 variant="ghost"
//                                 onClick={() => {
//                                   setReplyToId(null);
//                                   setReplyText("");
//                                 }}
//                                 aria-label="Cancel reply"
//                                 px={2}
//                               >
//                                 Cancel
//                               </Button>
//                             </Flex>
//                           </Box>
//                         )}
//                       </>
//                     )}
//                   </Box>
//                 ))}
//             </Box>
//           ))
