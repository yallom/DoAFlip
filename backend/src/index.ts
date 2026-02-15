import express from 'express';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import planoAlimentarRoutes from './routes/planoalimentar';
import foodRoutes from './routes/foods';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'

export const prisma = new PrismaClient();

const app = express();

app.use(express.json());     // Parser JSON
app.use(express.urlencoded({ extended: true })); // Parser URL
app.use(cors({
  origin: 'http://localhost:5173',
  credentials:false
}))


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/planoalimentar', planoAlimentarRoutes);
app.use('/api/foods', foodRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});