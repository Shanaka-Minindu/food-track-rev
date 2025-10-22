"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import React from "react";
import { useCategories } from "../_services/useCategoryQueries";
import { useDeleteCategory } from "../_services/useCategoryMutations";
import { useCategoryStore } from "../_lib/useCategoryStore";
import CategoryCardsSkeleton from "./category-cards-skeleton";
import NoItemsFound from "@/components/noItemsFound";
import {alert} from "@/lib/useGlobleStore"

const CategoryCards = () => {
  const categoryQueries = useCategories();
  const deleteCategoryQueries = useDeleteCategory();

  const { updateCategoryId, updateDialogOpen } = useCategoryStore();

  if(categoryQueries.data?.length == 0){
    return <NoItemsFound onClick={()=>updateDialogOpen(true)}/>
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {categoryQueries.isLoading ? (
        <CategoryCardsSkeleton />
      ) : (
        <>
          {" "}
          {categoryQueries.data?.map((item) => (
            <div
              className="bg-accent flex flex-col justify-between gap-3 rounded-lg p-6 shadow-md"
              key={item.id}
            >
              <p className="truncate">{item.name}</p>
              <div className="flex gap-1">
                <Button
                  className="size-6"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    updateCategoryId(item.id);
                    updateDialogOpen(true);
                  }}
                >
                  <Edit />
                </Button>
                <Button
                  className="size-6"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    alert({
                      onConfirm: () => {
                        deleteCategoryQueries.mutate(item.id);
                      },
                    });
                  }}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CategoryCards;
