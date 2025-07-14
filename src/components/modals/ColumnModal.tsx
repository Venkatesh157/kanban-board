import { Input, Text } from "@chakra-ui/react";
import BoardModal from "../ui/BoardModal";
import { ReactNode, useState } from "react";
import { useBoardContext } from "@/context/BoardContext";
import { v4 as uuidv4 } from "uuid";

type Props = {
  mode: "add" | "rename" | "delete";
  columnId?: string;
  intialName?: string;
  triggerLabel: () => ReactNode;
};

const ColumnModal = ({
  mode,
  columnId,
  intialName = "",
  triggerLabel,
}: Props) => {
  const [columnName, setColumnName] = useState(intialName);
  const { dispatch } = useBoardContext();

  const handleSubmit = () => {
    if (!columnName.trim()) return;

    if (mode === "add") {
      dispatch({
        type: "ADD_COLUMN",
        payload: { columnId: uuidv4(), name: columnName },
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
        <Input
          placeholder="Column name"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
        />
      ) : (
        <Text>
          Are you sure you want to delete the column? All the tasks in the
          column will be deleted
        </Text>
      )}
    </BoardModal>
  );
};

export default ColumnModal;
