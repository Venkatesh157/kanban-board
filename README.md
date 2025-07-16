# 🧠 Kanban Board

Modern, accessible, and extensible Kanban board built with React, Chakra UI, and Next.js

## 🧩 Overview

This is a **fully functional Kanban board** application built using modern React (with hooks), Next.js (App Router), Chakra UI for styling, and drag-and-drop via `@hello-pangea/dnd`. It supports:

- ✅ Column and task creation
- ✅ Drag & drop task reordering and column reordering
- ✅ Task editing, inline editing, and deletion
- ✅ Dark/light theme toggle with persistence
- ✅ State persistence with localStorage
- ✅ Full accessibility support (ARIA labels)

---

## 🚀 Features

| Feature                 | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| ♿ Accessibility First  | Full keyboard navigation, ARIA labels, color contrast safe |
| 🌓 Theme Toggle         | Dark/light mode with Chakra UI + `ColorModeScript`         |
| 🗃 Column Management     | Add, rename, reorder, delete columns                       |
| ✅ Task Management      | Add, edit, reorder, move across columns, delete            |
| 🔄 Drag and Drop        | Using `@hello-pangea/dnd` for intuitive drag interactions  |
| 💾 LocalStorage Sync    | Board state saved locally across reloads or sessions       |
| 🧪 Modular Architecture | Reducer-based state management, easily extendable          |

---

## 🛠 Tech Stack

- React 18 (Client Components)
- Next.js 14 (App Router)
- Chakra UI 3.x
- Context + Reducer for state management
- @hello-pangea/dnd for drag-and-drop
- TypeScript throughout

---

## 📸 Preview

![Kanban Preview Link](https://kanban-board-pi-gray.vercel.app/)

---

## 🧱 Architecture

```
    src/
    ├── components/
    │ ├── board/ # Board layout & logic
    │ ├── modals/ # Reusable modals for Task/Column CRUD
    │ ├── ui/ # Shared components (Tooltip, CommentSection)
    │ └── context/ # BoardContext with reducer/state management
    ├── reducers/
    │ ├── boardReducer.ts # Root reducer
    │ ├── handlers/
    │ │ ├── taskHandlers.ts
    │ │ ├── columnHandlers.ts
    │ │ └── commentHandlers.ts
    ├── types/
    │ └── board.ts # Task, Column, Action types
    ├── constants/
    │ └── initialBoard.ts # Default board state
```

## 🌐 SSR / Hydration Safety

To ensure compatibility **with Next.js SSR**:

- `uuidv4()` generation and `localStorage` access are safely wrapped in `useEffect`.
- `BoardProvider` delays state initialization on the server to prevent DOM mismatches caused by inconsistent UUIDs between server and client.

**Example: `SSR_STRATEGY`**

```
const [isClient, setIsClient] = useState(false);

useEffect(() => setIsClient(true), []);

const [state, dispatch] = useReducer(
  boardReducer,
  undefined,
  () => (isClient ? loadInitialState() : getInitialBoardState())
);
```

## ⚙️ State Management

The application uses a **typed reducer-based state architecture**, where each action (e.g. `ADD_TASK`, `RENAME_COLUMN`, `EDIT_COMMENT`) is dispatched to a centralized `boardReducer`, delegating logic to modular handlers.

**Example: `EDIT_TASK`**

```
dispatch({
  type: "EDIT_TASK",
  payload: {
    columnId,
    task: { ...task, title: newTitle },
  },
});
```

## 🧑‍🦽 Accessibility

All modals, buttons, and interactions follow **WAI-ARIA guidelines** to ensure an inclusive user experience:

- Modal triggers use `aria-haspopup`, `aria-expanded`, and support **focus trapping**.
- Tooltips and icon buttons include **accessible `aria-label`s** for screen readers.
- Full **keyboard navigation** support using `Tab`, `Shift+Tab`, `Enter`, and `Esc`.
- Visual **focus outlines** are preserved for accessibility.
- Comment inputs and threaded replies are properly labeled using `VisuallyHidden` components.

## 💡 Component Reusability

BoardModal is a generic modal wrapper, passed a trigger, title, and onSubmit.

InlineEditor is reused for editable fields (task title/description/comments).

CommentSection renders a threaded discussion with reply/edit UX similar to GitHub/Jira.

## 🧼 Clean Code Practices

All components follow strict typing with Props interfaces

Strict ESLint rules enforced via Next.js defaults

Reusable logic is extracted into composable functions/hooks

Example Usage

```ts
<TaskModal
  mode="edit"
  task={task}
  columnId={columnId}
  triggerLabel={() => (
    <IconButton aria-label="Edit Task" variant="ghost">
      <MdEdit />
    </IconButton>
  )}
/>
```

## 🧪 Testing (Recommended)

Unit testing: Jest with @testing-library/react

```ts
npm run test
```

## 📁 Persistent State

All board changes are saved to localStorage:

```ts

localStorage.setItem("kanban-board-state", JSON.stringify(state));

This allows for offline use, while preparing for future sync to a backend service.
```

```

```
