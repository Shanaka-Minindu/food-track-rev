"use server";
import { prisma } from "@/lib/db";
import { ServingUnitSchema } from "../_types/servingUnitSchema";
import { executeAction } from "@/lib/executeAction";

const deleteServingUnit = async (id: number) => {
  await executeAction({
    actionFn: () =>
      prisma.servingUnit.delete({
        where: {
          id,
        },
      }),
  });
};

const createServingUnit = async (data: ServingUnitSchema) => {
  await executeAction({
    actionFn: () =>
      prisma.servingUnit.create({
        data: {
          name: data.name,
        },
      }),
  });
};

const updateServingUnit = async (data: ServingUnitSchema) => {
  if (data.action === "update") {
    await executeAction({
      actionFn: () =>
        prisma.servingUnit.update({
          where: { id: data.id },
          data: {
            name: data.name,
          },
        }),
    });
  }
};

export { createServingUnit, deleteServingUnit ,updateServingUnit};
