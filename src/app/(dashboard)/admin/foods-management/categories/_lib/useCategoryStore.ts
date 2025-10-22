import { createStore } from "@/lib/createStore";

type State = {
  selectedCategoryId: number | null;
  categoryDialogOpen: boolean;
};

type Actions = {
  updateCategoryId: (id: State["selectedCategoryId"]) => void;
  updateDialogOpen: (is: State["categoryDialogOpen"]) => void;
};

type Store = State & Actions;

const useCategoryStore = createStore<Store>(
  (set) => ({
    selectedCategoryId: null,
    categoryDialogOpen: false,
    updateCategoryId: (id) =>
      set((state) => {
        state.selectedCategoryId = id;
      }),
    updateDialogOpen: (is) =>
      set((state) => {
        state.categoryDialogOpen = is;
      }),
  }),
  {
      name:"categories-store",

  }
);

export { useCategoryStore}
