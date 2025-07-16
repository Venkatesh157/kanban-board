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
  useState,
} from "react";

type BoardContextType = {
  state: BoardState;
  dispatch: React.Dispatch<Action>;
};

const LOCAL_STORAGE_KEY = "kanban-board-state";

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(boardReducer, getInitialBoardState());
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: "LOAD_STATE", payload: parsed });
      }
      // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn("Failed to save board state to localStorage:", err);
    }

    setIsHydrated(true);
  }, [state]);

  // Persist to localStorage when state changes
  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn("Failed to save board state to localStorage:", err);
    }
  }, [state, isHydrated]);

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
