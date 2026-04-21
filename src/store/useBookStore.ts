import { create } from "zustand";

interface BookState {
  currentPage: number;
  isOpening: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setOpening: (opening: boolean) => void;
}

export const useBookStore = create<BookState>((set) => ({
  currentPage: 0,
  isOpening: false,
  
  goToPage: (page: number) => set({ currentPage: page }),
  
  nextPage: () => set((state) => ({ 
    currentPage: Math.min(state.currentPage + 1, 7) 
  })),
  
  prevPage: () => set((state) => ({ 
    currentPage: Math.max(state.currentPage - 1, 0) 
  })),
  
  setOpening: (opening: boolean) => set({ isOpening: opening }),
}));
