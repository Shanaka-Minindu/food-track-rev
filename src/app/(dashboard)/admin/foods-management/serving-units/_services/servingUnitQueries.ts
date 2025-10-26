"use server";

import { prisma } from "@/lib/db";
import { ServingUnitSchema } from "../_types/servingUnitSchema";

const getServingUnits = async () => {
  return await prisma.servingUnit.findMany();
};

const getServingUnit = async (id: number): Promise<ServingUnitSchema> => {
  const res = await prisma.servingUnit.findFirst({
    where: {
      id,
    },
  });

  return {
    action : "update",
    id,
    name:res?.name||""
  }


};

export { getServingUnits, getServingUnit };
