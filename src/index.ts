import { drizzle } from 'drizzle-orm/node-postgres'
import 'dotenv/config'

// eslint-disable-next-line unused-imports/no-unused-vars,node/prefer-global/process
const db = drizzle(process.env.DATABASE_URL!)
