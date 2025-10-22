"use client"
import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  categoryDefaultValues,
  categorySchema,
  CategorySchema,
} from "../_types/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategoryStore } from "../_lib/useCategoryStore";
import { useCategory } from "../_services/useCategoryQueries";
import { useCreateCategory, useUpdateCategory } from "../_services/useCategoryMutations";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ControlledInput from "@/components/ui/controlled-input";


type CategoryFormDialogProps = {
  smallTrigger?: boolean;
};

const CategoryFormDialog = ({ smallTrigger }: CategoryFormDialogProps) => {
  const form = useForm<CategorySchema>({
    defaultValues: categoryDefaultValues,
    resolver: zodResolver(categorySchema),
  });

  const {categoryDialogOpen,selectedCategoryId,updateCategoryId,updateDialogOpen}= useCategoryStore();



const categoryQuery = useCategory();
const createCategoryQuery = useCreateCategory();
const updateCategoryQuery = useUpdateCategory();

const isPending = createCategoryQuery.isPending || updateCategoryQuery.isPending;

  useEffect(()=>{
    if(selectedCategoryId && categoryQuery.data){
      form.reset(categoryQuery.data)
    }
  },[selectedCategoryId ,categoryQuery.data , form])

const handleDialogOpenChange = (open:boolean)=>{
  updateDialogOpen(open);

  if(!open){
    updateCategoryId(null);
    form.reset(categoryDefaultValues)

  }
}

const handleSuccess=()=>{
  handleDialogOpenChange(false)
}

const onSubmit :SubmitHandler<CategorySchema>=(data)=>{
  if(data.action ==="create"){
    createCategoryQuery.mutate(data,{onSuccess:handleSuccess})
  }else{
    updateCategoryQuery.mutate(data,{onSuccess:handleSuccess})
  }
}

  return  <Dialog open={categoryDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        {smallTrigger ? (
          <Button size="icon" variant="ghost" type="button">
            <Plus />
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2" />
            New Category
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {selectedCategoryId ? "Edit Category" : "Create a New Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormProvider {...form}>
            <ControlledInput
              name="name"
              label="Name"
              placeholder="Enter Category Name"
            />
          </FormProvider>
          <DialogFooter>
            <Button type="submit" isLoading={isPending}>
              {!!selectedCategoryId?"Edit":"Create"} Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
};

export default CategoryFormDialog;
