import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createServingUnit, deleteServingUnit, updateServingUnit } from "./servingUnitsMutation";
import { ServingUnitSchema } from "../_types/servingUnitSchema";
import { toast } from "sonner";

const useDeleteServingUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {await deleteServingUnit(id)},
    onSuccess: () => {
      toast.success("Serving Unit Deleted Success");
      queryClient.invalidateQueries({ queryKey: ["servingUnits"] });
    },
  });
};

const useCreateServingUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ServingUnitSchema) =>{
      await createServingUnit(data)},
    onSuccess: () => {
      toast.success("Serving Unit Created Success");
      queryClient.invalidateQueries({ queryKey: ["servingUnits"] });
    },
  });
};

const useUpdateServingUnit = ()=>{

      const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data:ServingUnitSchema)=>{
      await updateServingUnit(data)
    },
    onSuccess:()=>{
      toast.success("Updated Successfully");
      queryClient.invalidateQueries({queryKey:["servingUnits"]})
    }
  })
}

export { useDeleteServingUnit, useCreateServingUnit ,useUpdateServingUnit};
