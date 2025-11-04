import { create } from 'zustand';
import { DrawingElement, Tool } from '@/types';

interface CanvasState {
  tool: Tool;
  color: string;
  size: number;
  elements: DrawingElement[];
  history: DrawingElement[][];
  historyIndex: number;
}

interface CanvasActions {
  setTool: (tool: Tool) => void;
  setColor: (color: string) => void;
  setSize: (size: number) => void;
  addElement: (element: DrawingElement) => void;
  clear: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const initialState: Omit<CanvasState, 'history' | 'historyIndex'> = {
  tool: 'draw',
  color: '#000000',
  size: 4,
  elements: [],
};

export const useCanvasStore = create<CanvasState & CanvasActions>((set, get) => ({
  ...initialState,
  history: [[]],
  historyIndex: 0,

  setTool: (tool) => set({ tool }),
  setColor: (color) => set({ color }),
  setSize: (size) => set({ size }),

  addElement: (element) => {
    set((state) => {
      const newElements = [...state.elements, element];
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newElements);
      return {
        elements: newElements,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
    get().updateUndoRedoState();
  },

  clear: () => {
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push([]);
      return {
        elements: [],
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
    get().updateUndoRedoState();
  },

  undo: () => {
    set((state) => {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        return {
          historyIndex: newIndex,
          elements: state.history[newIndex],
        };
      }
      return {};
    });
    get().updateUndoRedoState();
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        return {
          historyIndex: newIndex,
          elements: state.history[newIndex],
        };
      }
      return {};
    });
    get().updateUndoRedoState();
  },

  canUndo: false,
  canRedo: false,

  // Internal action to update derived state
  updateUndoRedoState: () => {
    set((state) => ({
      canUndo: state.historyIndex > 0,
      canRedo: state.historyIndex < state.history.length - 1,
    }));
  },
}));

// Initialize undo/redo state
useCanvasStore.getState().updateUndoRedoState();
