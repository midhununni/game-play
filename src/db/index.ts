
require('dotenv').config()

import { Match, Team, User, UserMatch } from './models'

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () => Promise.all([
     Team.sync({ alter: isDev || isTest }),
     User.sync({ alter: isDev || isTest }),
     Match.sync({ alter: isDev || isTest }),
     UserMatch.sync({ alter: isDev || isTest }),
  ])

export default dbInit 