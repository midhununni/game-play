import { Dialect, Sequelize } from 'sequelize'
import config from '../config/config'


const {database, user, password, host, driver} = config.mysql;


const sequelizeConnection = new Sequelize(database as string, user as string, password, {
  host,
  dialect : driver as Dialect
})

export default sequelizeConnection