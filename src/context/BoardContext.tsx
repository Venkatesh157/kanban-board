"use client";

import { getInitialBoardState } from "@/constants/initialBoard";
import { boardReducer } from "@/reducers/boardReducer";
import { Action, BoardState } from "@/types/board";
import {
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  createContext,
} from "react";

type BoardContextType = {
  state: BoardState;
  dispatch: React.Dispatch<Action>;
};

const LOCAL_STORAGE_KEY = "kanban-board-state";

const BoardContext = createContext<BoardContextType | undefined>(undefined);

const loadInitialState = (): BoardState => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (err) {
    console.warn("Failed to load board state from localStorage:", err);
  }
  return getInitialBoardState();
};

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    boardReducer,
    undefined,
    loadInitialState
  );

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn("Failed to save board state to localStorage:", err);
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
