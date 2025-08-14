import {pgTable, varchar} from "drizzle-orm/pg-core"

export const env = pgTable('env', {
    id: varchar(),
    value: varchar()
});

export type EnvRow = typeof env.$inferSelect