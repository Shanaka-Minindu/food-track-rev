"use client";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategory } from "./categoryQueries";
import { useCategoryStore } from "../_lib/useCategoryStore";

const useCategories = () => {
  
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

const useCategory = ()=>{

    const {selectedCategoryId } = useCategoryStore();
    return useQuery({
        queryKey:["categories",{selectedCategoryId}],
        queryFn : ()=>getCategory(selectedCategoryId!),
        enabled : !!selectedCategoryId
    })
}

export { useCategories ,useCategory};
