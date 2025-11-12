"use client";
import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  foodDefaultValues,
  foodSchema,
  FoodSchema,
} from "../_types/foodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFood } from "../_services/use-food-queries";
import { useCategories } from "../../categories/_services/useCategoryQueries";
import { useCreateFood, useUpdateFood } from "../_services/use-food-mutation";
import { useFoodStore } from "../_libs/use-food-store";
import { useCategoryStore } from "../../categories/_lib/useCategoryStore";
import { useServingUnitStore } from "../../serving-units/_lib/useServingStore";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ControlledInput from "@/components/ui/controlled-input";
import { ControlledSelect } from "@/components/ui/controlled-select";
import CategoryFormDialog from "../../categories/_components/categoryFormDialog";
import SpecifyFoodServingUnit from "./specify-food-serving-unit";

const FoodFormDialog = () => {
  const form = useForm<FoodSchema>({
    defaultValues: foodDefaultValues,
    resolver: zodResolver(foodSchema),
  });

  const foodQuery = useFood();
  const categoryQuery = useCategories();

  const createFoodMutation = useCreateFood();
  const updateFoodMutation = useUpdateFood();

  const isPending =
    createFoodMutation.isPending || updateFoodMutation.isPending;

  const {
    selectedFoodId,
    updateSelectedFoodId,
    foodDialogOpen,
    updateFoodDialogOpen,
  } = useFoodStore();

  const { categoryDialogOpen } = useCategoryStore();
  const { ServingUnitDialogOpen } = useServingUnitStore();

  useEffect(() => {
    if (!!selectedFoodId && foodQuery.data) {
      form.reset(foodQuery.data);
    }
  }, [foodQuery, form, selectedFoodId]);

  const handleDialogOpenChange = (open: boolean) => {
    updateFoodDialogOpen(open);

    if (!open) {
      updateFoodDialogOpen(false);
      form.reset(foodDefaultValues);
    }
  };

  const handleSuccess = () => {
    updateFoodDialogOpen(false);
  };

  const disableSubmit = categoryDialogOpen || ServingUnitDialogOpen;

  const onSubmit: SubmitHandler<FoodSchema> = (data) => {
    console.log(data)
    if (data.action === "create") {
      createFoodMutation.mutate(data, { onSuccess: handleSuccess });
    } else {
      updateFoodMutation.mutate(data, { onSuccess: handleSuccess });
    }
  };

  return (
    <Dialog open={foodDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2" />
          New Food
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {selectedFoodId ? "Edit Food" : "Create a New Food"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={disableSubmit ? undefined : form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormProvider {...form}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 grid">
                <ControlledInput<FoodSchema>
                  name="name"
                  label="Name"
                  placeholder="Enter the Food Name"
                />
              </div>
              <div className="col-span-1 flex items-end">
                <ControlledSelect<FoodSchema>
                  label="Category"
                  name="categoryId"
                  options={categoryQuery.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
                <CategoryFormDialog smallTrigger />
              </div>
              <div>
                <ControlledInput<FoodSchema>
                  name="calories"
                  label="Calories"
                  type="number"
                  placeholder="kcal"
                />
              </div>
              <div>
                <ControlledInput<FoodSchema>
                  name="protein"
                  label="Protein"
                  type="number"
                  placeholder="grams"
                />
              </div>
              <div>
                <ControlledInput<FoodSchema>
                  name="carbohydrates"
                  label="Carbohydrates"
                  type="number"
                  placeholder="grams"
                />
              </div>
              <div>
                <ControlledInput<FoodSchema>
                  name="fat"
                  label="Fat"
                  type="number"
                  placeholder="grams"
                />
              </div>
              <div>
                <ControlledInput<FoodSchema>
                  name="fiber"
                  label="Fiber"
                  type="number"
                  placeholder="grams"
                />
              </div>
              <div>
                <ControlledInput<FoodSchema>
                  name="sugar"
                  label="Sugar"
                  type="number"
                  placeholder="grams"
                />
              </div>
              <div className="col-span-2">
                <SpecifyFoodServingUnit />
              </div>
            </div>
          </FormProvider>
          <DialogFooter>
            <Button type="submit" isLoading={isPending}>
              {!!selectedFoodId ? "Edit" : "Create"} Food
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FoodFormDialog;
