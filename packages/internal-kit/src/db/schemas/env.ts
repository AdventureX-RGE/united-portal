import {pgTable, text} from "drizzle-orm/pg-core"

export const env = pgTable('env', {
    id: text().primaryKey(),
    value: text()
});