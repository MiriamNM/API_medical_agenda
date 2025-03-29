import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import scheduleRoutes from './routes/schedule.routes';
import { errorHandler } from './middlewares/errorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/schedules', scheduleRoutes);

app.use(errorHandler);

export default app;