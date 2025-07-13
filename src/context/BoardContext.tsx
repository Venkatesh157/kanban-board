"use client";

import { boardReducer } from "@/reducers/boardReducer";
import { Action, BoardState } from "@/types/board";
import {
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  createContext,
} from "react";

const initialState: BoardState = {
  columns: {},
  tasks: {},
  columnOrder: [],
};

type BoardContextType = {
  state: BoardState;
  dispatch: React.Dispatch<Action>;
};

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(boardReducer, initialState, () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("board");
      return stored ? JSON.parse(stored) : initialState;
    }
    return initialState;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("board", JSON.stringify(state));
    }
  }, [state]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("useBoardContext must be inside the Provider");
  }
  return context;
};
