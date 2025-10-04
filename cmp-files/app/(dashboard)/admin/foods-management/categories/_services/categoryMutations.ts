"use server";
import { prisma } from "@/lib/db";
import { executeAction } from "@/lib/executeAction";
import { CategorySchema } from "../_types/categorySchema";

const deleteCategory = async (id: number) => {
  await executeAction({
    actionFn: () => prisma.category.delete({ where: { id } }),
  });
};

const createCategory = async (data: CategorySchema) => {
  await executeAction({
    actionFn: () =>
      prisma.category.create({
        data: {
          name: data.name,
        },
      }),
  });
};

const updateCategory = async (data: CategorySchema) => {
  if (data.action === "update") {
    await executeAction({
      actionFn: () =>
        prisma.category.update({
          where: {
            id: data.id,
          },
          data: {
            name: data.name,
          },
        }),
    });
  }
};

export { deleteCategory , createCategory, updateCategory};
