import { Flex, IconButton, Input, Textarea } from "@chakra-ui/react";
import { FiCheck, FiX } from "react-icons/fi";

type Props = {
  value: string;
  onChange: (val: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isTextarea?: boolean;
};

const InlineEditor = ({
  value,
  onChange,
  onSave,
  onCancel,
  isTextarea,
}: Props) => {
  return (
    <Flex direction="column" gap={2}>
      {isTextarea ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          size="sm"
          p={2}
          autoFocus
          aria-label="Edit content"
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          size="sm"
          p={2}
          autoFocus
          aria-label="Edit content"
        />
      )}
      <Flex gap={2}>
        <IconButton
          aria-label="Save"
          size="sm"
          onClick={onSave}
          colorScheme="green"
        >
          <FiCheck />
        </IconButton>
        <IconButton
          aria-label="Cancel"
          size="sm"
          onClick={onCancel}
          variant="ghost"
        >
          <FiX />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default InlineEditor;
