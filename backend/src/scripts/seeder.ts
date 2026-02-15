import { PrismaClient } from "@prisma/client";
import { Gender, Goal, MealType } from "../types/types";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Fetch existing foods (since we are NOT seeding Food)
  const foods = await prisma.food.findMany();

  if (foods.length === 0) {
    throw new Error("⚠️ No foods found in database. Seed Food table first.");
  }

  // Create Users
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        hashPassword: faker.internet.password(),
        name: faker.person.fullName(),
        age: faker.number.int({ min: 18, max: 65 }),
        height: faker.number.int({ min: 150, max: 200 }),
        weight: faker.number.float({ min: 50, max: 120 }),
        gender: faker.helpers.arrayElement(["Masculine", "Feminine"]),
        alergies: faker.helpers.arrayElements(
          ["peanuts", "lactose", "soy", "seafood"],
          { min: 0, max: 2 }
        ),
        goal: faker.helpers.arrayElement(["weight_loss","muscle_gain","maintenance"]),
      },
    });

    // Create Meal Plan
    const mealPlan = await prisma.mealPlan.create({
      data: {
        user_id: user.id,
        name: `${faker.word.adjective()} Plan`,
        start_date: faker.date.recent(),
        end_date: faker.date.soon(),
        calorie_goal: faker.number.int({ min: 1800, max: 3000 }),
        notes: faker.lorem.sentence(),
      },
    });

    // Create Meals
    for (let j = 0; j < 7; j++) {
      const meal = await prisma.meal.create({
        data: {
          mealPlan_id: mealPlan.id,
          type: faker.helpers.arrayElement(["breakfast","lunch","dinner","snack"]),
          date: faker.date.recent(),
        },
      });

      // Create Recipes per Meal
      const recipeCount = faker.number.int({ min: 1, max: 3 });

      for (let r = 0; r < recipeCount; r++) {
        const recipe = await prisma.recipe.create({
          data: {
            name: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            portions: faker.number.int({ min: 1, max: 4 }),
            prep_time: faker.number.int({ min: 10, max: 90 }),
            total_calories: faker.number.int({ min: 200, max: 800 }),
            meal_id: meal.id,
          },
        });

        // Add Ingredients
        const ingredientCount = faker.number.int({ min: 2, max: 5 });

        const selectedFoods = faker.helpers.arrayElements(
          foods,
          ingredientCount
        );

        for (const food of selectedFoods) {
          const ingredient = await prisma.recipeIngredient.create({
            data: {
              recipe_id: recipe.id,
              food_id: food.id,
              quantity: faker.number.float({ min: 50, max: 300 }),
            },
          });

          // Optionally create replacements
          if (faker.datatype.boolean()) {
            const replacementFood = faker.helpers.arrayElement(foods);

            if (replacementFood.id !== food.id) {
              await prisma.foodReplacement.create({
                data: {
                  recipe_ingredient_id: ingredient.id,
                  original_food_id: food.id,
                  replacement_food_id: replacementFood.id,
                  quantity: faker.number.float({ min: 50, max: 300 }),
                  similarity_score: faker.number.float({ min: 0.5, max: 1 }),
                  justification: faker.lorem.sentence(),
                  reason: faker.lorem.word(),
                },
              });
            }
          }
        }
      }
    }
  }

  console.log("✅ Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
