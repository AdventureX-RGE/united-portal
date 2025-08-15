import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './packages/internal-kit/src/db/schemas',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.MODE!.toLowerCase() == 'production' ?
        process.env.DATABASE_URL! :
        "postgresql://portal:portal@127.0.0.1:5434/portal",
  },
});
