import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import foodModel from '../models/foods'
import { FoodCategory } from '../types/types'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client';

const prisma =  new PrismaClient()

await prisma.food.deleteMany()
console.log("Foods Eliminated")

const cleaned_csv = readFileSync('src/datasets/cleaned_dataset.csv', 'utf-8')

const records = parse(cleaned_csv, {
  columns: true,
  skip_empty_lines: true
});

for (const row of records) {

    try {
        let data = {
            name: row["food"] as string,
            normalized_name: row["food_normalized"] as string,
            category: faker.helpers.arrayElement(["protein", "carbohidrate", "vegetable", "fruit", "fat", "dairy", "grains"]) as FoodCategory, // este dataset n tem categoria
            vit_c: Number(row["Vitamin C (mg per 100g)"]) as number,
            vit_b11: Number(row["Vitamin B11 (mg per 100g)"]) as number,
            sodium: Number(row["Sodium (mg per 100g)"]) as number,
            calcium: Number(row["Calcium (mg per 100g)"]) as number,
            iron: Number(row["Iron (mg per 100g)"]) as number,
            carbs: Number(row["Carbohydrates (g per 100g)"]) as number,
            fat: Number(row["Fat (g per 100g)"]) as number,
            fiber: Number(row["Dietary Fiber (g per 100g)"]) as number,
            protein: Number(row["Protein (g per 100g)"]) as number,
            sugar: Number(row["Sugars (g per 100g)"]) as number,
            calories: Number(row["Calories (kcal per 100g)"]) as number,
            health_score: faker.number.int({min:0,max:100}) as number,
        }
        const result = await foodModel.create(data)
    } catch (error) {
        console.log(error)
    }
}