import express from "express";
import bodyParser from 'body-parser';
import helmet from "helmet";
import adminRoutes from './routes/admin.routes'
import userRoutes from './routes/user.routes'
import { notFoundHandler } from './middlewares/not-found'


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet());


app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user', userRoutes);
app.use(notFoundHandler);

export default app;