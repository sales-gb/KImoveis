import 'express-async-errors';
import 'reflect-metadata';
import express, { Application } from 'express';
import { handleErrors } from './error';
import { userRoutes } from './routes/user.routes';
import { loginRoutes } from './routes/login.routes';
import { categoryRoutes } from './routes/category.routes';
import { realEstateRoute } from './routes/realEstate.routes';
import { scheduleRoute } from './routes/schedule.routes';

const app: Application = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/categories', categoryRoutes);
app.use('/realEstate', realEstateRoute);
app.use('/schedules', scheduleRoute);

app.use(handleErrors);

export default app;
