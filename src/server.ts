import http from 'http';
import app from './app'
import config from './config/config';
import adminRoutes from './routes/admin.routes'
import userRoutes from './routes/user.routes'
import { notFoundHandler } from './middlewares/not-found'

// import dbInit from './db'
// dbInit()



// /** Log the request */
// router.use((req, res, next) => {
//     /** Log the req */
//     logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

//     res.on('finish', () => {
//         /** Log the res */
//         logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
//     })
    
//     next();
// });

app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user', userRoutes);
app.use(notFoundHandler);


const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => console.log(`Server is running ${config.server.hostname}:${config.server.port}`));