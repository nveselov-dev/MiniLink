import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import { connectDB } from "./config/database.js";

// Для локального запуска
// dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/api', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'MiniLink API is running!' });
});

connectDB().then(() => {
    app.listen(PORT, () => {})
})


