import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  user: {},
  setUser: (newUser) => set((state) => ({ user: newUser })),
}));
