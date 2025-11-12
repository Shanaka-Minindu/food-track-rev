import { executeAction } from "@/lib/executeAction";
import { foodSchema, FoodSchema } from "../_types/foodSchema";
import { prisma } from "@/lib/db";
import { toNumberSafe } from "@/lib/utils";

const createFood = async (data: FoodSchema) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = foodSchema.parse(data);

      const food = await prisma.food.create({
        data: {
          name: validatedData.name,
          calories: toNumberSafe(validatedData.calories),
          carbohydrates: toNumberSafe(validatedData.carbohydrates),
          fat: toNumberSafe(validatedData.fat),
          fiber: toNumberSafe(validatedData.fiber),
          protein: toNumberSafe(validatedData.protein),
          sugar: toNumberSafe(validatedData.sugar),
          categoryId: toNumberSafe(validatedData.categoryId) || null,
        },
      });

      await Promise.all(
        validatedData.foodServingUnit.map(async (unit) => {
          await prisma.foodServingUnit.create({
            data: {
              foodId: food.id,
              servingUnitId: toNumberSafe(unit.foodServingId),
              grams: toNumberSafe(unit.grams),
            },
          });
        })
      );
    },
  });
};

const updateFood = async (data: FoodSchema) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = foodSchema.parse(data);
      if (validatedData.action == "update") {
        await prisma.food.update({
          where: {
            id: validatedData.id,
          },
          data: {
            name: validatedData.name,
            calories: toNumberSafe(validatedData.calories),
            carbohydrates: toNumberSafe(validatedData.carbohydrates),
            fat: toNumberSafe(validatedData.fat),
            fiber: toNumberSafe(validatedData.fiber),
            sugar: toNumberSafe(validatedData.sugar),
            protein: toNumberSafe(validatedData.protein),
            categoryId: toNumberSafe(validatedData.categoryId) || null,
          },
        });

        await prisma.foodServingUnit.deleteMany({
          where: {
            id: validatedData.id,
          },
        });

        await Promise.all(
          validatedData.foodServingUnit.map(async (unit) => {
            await prisma.foodServingUnit.create({
              data: {
                foodId: validatedData.id,
                servingUnitId: toNumberSafe(unit.foodServingId),
                grams: toNumberSafe(unit.grams),
              },
            });
          })
        );
      }
    },
  });
};

const deleteFood = async (id: number) => {
  await executeAction({
    actionFn: async () => {
      await prisma.foodServingUnit.deleteMany({
        where: {
          foodId: id,
        },
      });

      await prisma.food.delete({
        where: {
          id,
        },
      });
    },
  });
};

export { createFood, updateFood, deleteFood };
