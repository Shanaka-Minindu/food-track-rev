"use client";
import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  servingUnitDefaultValues,
  servingUnitSchema,
  ServingUnitSchema,
} from "../_types/servingUnitSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServingUnitStore } from "../_lib/useServingStore";
import { useCreateServingUnit, useUpdateServingUnit } from "../_services/useServingUnitMutation";
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
import { useServingUnit } from "../_services/useServingUnitQueries";

type ServingUnitFormDialogProps = {
  smallTrigger?: boolean;
};
const ServingUnitFormDialog = ({
  smallTrigger,
}: ServingUnitFormDialogProps) => {
  const form = useForm<ServingUnitSchema>({
    defaultValues: servingUnitDefaultValues,
    resolver: zodResolver(servingUnitSchema),
  });

  const {
    selectedServingUnitId,
    updateServingUnitId,
    ServingUnitDialogOpen,
    updateDialogOpen,
  } = useServingUnitStore();

  // const servingUnitQuery = useServingUnit();
  const servingUnitQuery = useServingUnit();
  const createServingUnitMutation = useCreateServingUnit();
  const updateServingUnitMutation  = useUpdateServingUnit();

  // useEffect(() => {
  //   if (!!selectedServingUnitId && servingUnitQuery.data) {
  //     form.reset(servingUnitQuery.data);
  //   }
  // }, [servingUnitQuery.data, form, selectedServingUnitId]);

  useEffect(()=>{
    if(!!selectedServingUnitId && servingUnitQuery.data){
      form.reset(servingUnitQuery.data)
    }
  },[selectedServingUnitId,servingUnitQuery.data,form])

  const handleDialogOpenChange = (open: boolean) => {
    updateDialogOpen(open);

    if (!open) {
      updateServingUnitId(null);
      form.reset(servingUnitDefaultValues);
    }
  };

  const handleSuccess = () => {
    handleDialogOpenChange(false);
  };

  const onSubmit: SubmitHandler<ServingUnitSchema> = (data) => {
    if (data.action === "create") {
      createServingUnitMutation.mutate(data, {
        onSuccess: handleSuccess,
      });
    } else {
      updateServingUnitMutation.mutate(data, { onSuccess: handleSuccess });
    }
  };

  const isPending = createServingUnitMutation.isPending;

  

  return (
    <Dialog open={ServingUnitDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        {smallTrigger ? (
          <Button size="icon" variant="ghost" type="button">
            <Plus />
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2" />
            New Serving Unit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {selectedServingUnitId
              ? "Edit Serving Unit"
              : "Create a New Serving Unit"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormProvider {...form}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <ControlledInput<ServingUnitSchema>
                  name="name"
                  label="Name"
                  placeholder="Enter serving unit name"
                />
              </div>
            </div>
          </FormProvider>
          <DialogFooter>
            <Button type="submit" isLoading={isPending}>
              {!!selectedServingUnitId ? "Edit" : "Create"} Serving Unit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServingUnitFormDialog;
