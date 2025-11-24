"use server";

import { executeAction } from "@/lib/executeAction";
import { mealSchema, MealSchema } from "../_types/mealSchema";
import { prisma } from "@/lib/db";
import { toNumberSafe } from "@/lib/utils";

const createMeal = async (data: MealSchema) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = mealSchema.parse(data);

      const meal = await prisma.meal.create({
        data: {
          userId: toNumberSafe(validatedData.userId),
          dateTime: validatedData.dataTime,
        },
      });

      await Promise.all(
        validatedData.mealFoods.map(async (food) => {
          await prisma.mealFood.create({
            data: {
              mealId: meal.id,
              foodId: toNumberSafe(food.foodId),
              amount: toNumberSafe(food.amount),
              servingUnitId: toNumberSafe(food.servingUnitId),
            },
          });
        })
      );
    },
  });
};

const updateMeal = async (data: MealSchema) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = mealSchema.parse(data);
      if (validatedData.action === "update") {
        await prisma.meal.update({
          where: { id: validatedData.id },
          data: {
            dateTime: validatedData.dataTime,
          },
        });
        await prisma.mealFood.deleteMany({
          where: { mealId: validatedData.id },
        });
        await Promise.all(
          validatedData.mealFoods.map(async (food) => {
            await prisma.mealFood.create({
              data: {
                mealId: validatedData.id,
                foodId: toNumberSafe(food.foodId),
                servingUnitId: toNumberSafe(food.servingUnitId),
                amount: toNumberSafe(food.amount),
              },
            });
          })
        );
      }
    },
  });
};

const deleteMeal = async (id: number) => {
  await executeAction({
    actionFn: async () => {
      await prisma.mealFood.deleteMany({
        where: { mealId: id },
      });
      await prisma.meal.delete({ where: { id } });
    },
  });
};

export {createMeal, deleteMeal,updateMeal}