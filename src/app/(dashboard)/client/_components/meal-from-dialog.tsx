"use client"

import { Session } from "next-auth";
import { useForm, useWatch } from "react-hook-form";
import { mealDefaultValues, mealSchema, MealSchema } from "../_types/mealSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMealsStore } from "../_libs/use-meal-store";

type MealFormDialogProps = {
    smallTrigger?: boolean;
    session:Session
}

const MealFormDialog=({smallTrigger,session}:MealFormDialogProps)=>{
    const form = useForm<MealSchema>({
        defaultValues:mealDefaultValues,
        resolver:zodResolver(mealSchema)
    });

    const userId = useWatch({control:form.control, name:"userId"})

    const {selectedMealId,updateSelectedMealId,mealDialogOpen,updateMealDialogOpen} = useMealsStore();
}