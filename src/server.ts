import http from 'http';
import app from './app'
import config from './config/config';


import dbInit from './db'
dbInit()


const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => console.log(`Server is running ${config.server.hostname}:${config.server.port}`));