import { Input, Text } from "@chakra-ui/react";
import BoardModal from "../ui/BoardModal";
import { ReactNode, useState } from "react";
import { useBoardContext } from "@/context/BoardContext";
import { v4 as uuidv4 } from "uuid";

type Props = {
  mode: "add" | "rename" | "delete";
  columnId?: string;
  initialName?: string;
  triggerLabel: () => ReactNode;
};

const ColumnModal = ({
  mode,
  columnId,
  initialName = "",
  triggerLabel,
}: Props) => {
  const [columnName, setColumnName] = useState(initialName);
  const { dispatch } = useBoardContext();

  const handleSubmit = () => {
    if (!columnName.trim() && mode !== "delete") return;

    if (mode === "add") {
      const newColumnId = uuidv4();
      dispatch({
        type: "ADD_COLUMN",
        payload: { columnId: newColumnId, name: columnName },
      });
    } else if (mode === "rename" && columnId) {
      dispatch({
        type: "RENAME_COLUMN",
        payload: { columnId, text: columnName },
      });
    } else if (mode === "delete" && columnId) {
      dispatch({
        type: "REMOVE_COLUMN",
        payload: { columnId },
      });
    }

    setColumnName("");
  };

  const handleModalTitle = (mode: string) => {
    if (mode === "add") {
      return "Create New Column";
    } else if (mode === "rename") {
      return "Rename Column";
    }
    return "Delete Column";
  };

  return (
    <BoardModal
      triggerLabel={triggerLabel}
      title={handleModalTitle(mode)}
      onSubmit={handleSubmit}
    >
      {mode !== "delete" ? (
        <>
          <Text mb="3">Column Name</Text>
          <Input
            placeholder="Column name"
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
            padding={2}
          />
        </>
      ) : (
        <Text>
          Are you sure you want to delete the column? All the tasks in the
          column will be deleted!
        </Text>
      )}
    </BoardModal>
  );
};

export default ColumnModal;
