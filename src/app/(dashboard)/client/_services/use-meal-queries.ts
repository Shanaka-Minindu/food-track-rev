import { useQuery } from "@tanstack/react-query";
import { useMealsStore } from "../_libs/use-meal-store"
import { getMeal, getMeals } from "./mealQueries";

const useMeals=()=>{
    const {mealFilter}= useMealsStore();

    return useQuery({
        queryKey:["meals",mealFilter],
        queryFn:()=>getMeals(mealFilter),
    })
}

const useMeal = ()=>{
    const {selectedMealId}= useMealsStore();

    return useQuery({
        queryKey:["meals",{selectedMealId}],
        queryFn: ()=>getMeal(selectedMealId!),
        enabled: !!selectedMealId
    })
}

export {useMeal,useMeals}