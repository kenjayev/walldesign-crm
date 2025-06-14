import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  user: { role: "admin" },
  setUser: (newUser) => set((state) => ({ user: newUser })),
}));
