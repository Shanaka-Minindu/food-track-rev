import { createStore } from "@/lib/createStore";
import { mealDefaultValues, MealSchema } from "../_types/mealSchema";
import { mealFiltersDefaultValues, MealFiltersSchema } from "../_types/mealFilterSchema";

type State = {
  selectedMealId: number | null;
  mealDialogOpen: boolean;
  mealFilter: MealFiltersSchema;
};

type Actions = {
  updateSelectedMealId: (id: State["selectedMealId"]) => void;
  updateMealDialogOpen: (is: State["mealDialogOpen"]) => void;
  updateMealFilter: (filters: State["mealFilter"]) => void;
};

type Store = State & Actions;

const useMealsStore = createStore<Store>(
  (set) => ({
    selectedMealId: null,
    updateSelectedMealId: (id) =>
      set((state) => {
        state.selectedMealId = id;
      }),
    mealDialogOpen: false,
    updateMealDialogOpen: (is) =>
      set((state) => {
        state.mealDialogOpen = is;
      }),
    mealFilter: mealFiltersDefaultValues,
    updateMealFilter: (filters) =>
      set((state) => {
        state.mealFilter = filters;
      }),
  }),
  {
    name: "meals-store",
  }
);

export { useMealsStore };
