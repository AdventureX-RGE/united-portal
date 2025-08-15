import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';

export const db = drizzle(
    process.env.MODE!.toLowerCase() == 'production' ?
        process.env.DATABASE_URL! :
        "postgresql://portal:portal@127.0.0.1:5434/portal"
);
