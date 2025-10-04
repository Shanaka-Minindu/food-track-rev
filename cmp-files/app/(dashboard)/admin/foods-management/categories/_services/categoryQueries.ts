"use server";
import { prisma } from "@/lib/db";
import { CategorySchema } from "../_types/categorySchema";

export const getCategories = async () => {
  return await prisma.category.findMany();
};

export const getCategory = async (id: number): Promise<CategorySchema> => {
  const res = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  return {
    action: "update",
    id,
    name: res?.name || "",
  };
};
