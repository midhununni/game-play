import express from "express";
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin.routes'
import userRoutes from './routes/user.routes'
import { notFoundHandler } from './middlewares/not-found'


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});


app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user', userRoutes);
app.use(notFoundHandler);

export default app;