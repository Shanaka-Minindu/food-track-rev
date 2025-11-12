import { createStore } from "@/lib/createStore";
import {
  foodFilterDefaultValues,
  FoodFilterSchema,
} from "../_types/foodFilterSchema";

type State = {
  selectedFoodId: number | null;
  foodDialogOpen: boolean;
  foodFilters: FoodFilterSchema;
  foodFilterDrawerOpen: boolean;
};

type Action = {
  updateSelectedFoodId: (id: State["selectedFoodId"]) => void;
  updateFoodDialogOpen: (is: State["foodDialogOpen"]) => void;
  updateFoodFilters: (filters: State["foodFilters"]) => void;
  updateFoodFilterDrawerOpen: (is: State["foodFilterDrawerOpen"]) => void;
  updateFoodFilterPage: (action: "next" | "prev" | number) => void;
  updateFoodFiltersSearchTerm: (
    str: State["foodFilters"]["searchTerm"]
  ) => void;
};

type Store = State & Action;

const useFoodStore = createStore<Store>(
  (set) => ({
    selectedFoodId: null,
    updateSelectedFoodId: (id) =>
      set((state) => {
        state.selectedFoodId = id;
      }),
    foodDialogOpen: false,
    updateFoodDialogOpen: (is) =>
      set((state) => {
        state.foodDialogOpen = is;
      }),
    foodFilters: foodFilterDefaultValues,
    updateFoodFilters: (filters) =>
      set((state) => {
        state.foodFilters = filters;
      }),
    foodFilterDrawerOpen: false,
    updateFoodFilterDrawerOpen: (is) =>
      set((state) => {
        state.foodFilterDrawerOpen = is;
      }),
    updateFoodFilterPage: (action) =>
      set((state) => {
        const currentPage = state.foodFilters.page;
        let newPage = currentPage;

        if (action === "next") {
          newPage = currentPage + 1;
        } else if (action === "prev") {
          newPage = Math.max(currentPage - 1, 1);
        } else if (typeof action === "number") {
          newPage = action;
        }

        return {
          foodFilters: {
            ...state.foodFilters,
            page: newPage,
          },
        };
      }),
    updateFoodFiltersSearchTerm: (searchTerm) =>
      set((state) => {
        state.foodFilters.searchTerm = searchTerm;
      }),
  }),
  {
    name: "foods-store",
    excludeFormPersist: ["foodFilters"],
  }
);

export { useFoodStore };
