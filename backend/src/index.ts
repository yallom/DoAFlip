import express from 'express';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import mealPlanRoutes from './routes/mealPlan';
import mealRoutes from './routes/meals';
import foodRoutes from './routes/foods';
import recipeRoutes from './routes/recipe';
import recipeIngredientRoutes from './routes/recipeIngredient';
import foodReplacementRoutes from './routes/foodReplacement';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'

export const prisma = new PrismaClient();

const app = express();

app.use(express.json());     // Parser JSON
app.use(express.urlencoded({ extended: true })); // Parser URL
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: false
}))

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mealplan', mealPlanRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/recipeingredients', recipeIngredientRoutes);
app.use('/api/foodreplacements', foodReplacementRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
