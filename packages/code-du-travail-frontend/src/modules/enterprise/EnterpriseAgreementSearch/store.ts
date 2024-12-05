import { create } from "zustand";

export const useEnterpriseSearchStore = create<{
  search: string;
  setSearch: (value: string) => void;
}>((set) => ({
  search: "",
  setSearch: (search) => {
    set(() => ({ search }));
  },
}));
