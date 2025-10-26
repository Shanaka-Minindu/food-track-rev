"use client";
import React from "react";
import { useServingUnits } from "../_services/useServingUnitQueries";
import { useDeleteServingUnit } from "../_services/useServingUnitMutation";
import { useServingUnitStore } from "../_lib/useServingStore";
import ServingUnitCardsSkeleton from "./servingUnit-cards-skeleton";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { alert } from "@/lib/useGlobleStore";
import NoItemsFound from "@/components/noItemsFound";

const ServingUnitCards = () => {
  const servingUnitQueries = useServingUnits();
  const deleteServingUnit = useDeleteServingUnit();

  const { updateServingUnitId, updateDialogOpen } = useServingUnitStore();

  if(servingUnitQueries.data?.length === 0){
    return <NoItemsFound onClick={()=>updateDialogOpen(true)}/>
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {servingUnitQueries.isLoading ? (
        <ServingUnitCardsSkeleton />
      ) : (
        <>
          {servingUnitQueries.data?.map((item) => (
            <div
              className="bg-accent flex flex-col justify-between gap-3 rounded-lg p-6 shadow-md"
              key={item.id}
            >
              <p className="truncate">{item.name}</p>
              <div className="flex gap-1">
                <Button className="size-6" variant="ghost" size="icon"
                onClick={()=>{
                    updateServingUnitId(item.id);
                    updateDialogOpen(true)
                }}>
                  <Edit />
                </Button>
                <Button className="size-6" variant="ghost" size="icon"
                onClick={()=>{
                    alert({
                        onConfirm:()=>{
                          deleteServingUnit.mutate(item.id);  
                        }
                    })
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

export default ServingUnitCards;
