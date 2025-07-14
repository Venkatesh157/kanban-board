import { Input } from "@chakra-ui/react";
import BoardModal from "../ui/BoardModal";
import { ReactNode, useState } from "react";
import { useBoardContext } from "@/context/BoardContext";
import { v4 as uuidv4 } from "uuid";

type Props = {
  mode: "add" | "rename";
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
    }

    setColumnName("");
  };

  return (
    <BoardModal
      triggerLabel={triggerLabel}
      title={mode === "add" ? "Create New Column" : "Rename Column"}
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Column name"
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
      />
    </BoardModal>
  );
};

export default ColumnModal;
