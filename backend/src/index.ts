import express from 'express';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import mealPlanRoutes from './routes/mealPlan';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const app = express();

app.use(express.json());     // Parser JSON
app.use(express.urlencoded({ extended: true })); // Parser URL


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mealplan', mealPlanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});