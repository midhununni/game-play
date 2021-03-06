
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASSWORD ;
const DB_DRIVER = process.env.DB_DRIVER ;

const MYSQL = {
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
    driver: DB_DRIVER
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_PORT = process.env.SERVER_PORT;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mysql: MYSQL,
    server: SERVER
};

export default config;