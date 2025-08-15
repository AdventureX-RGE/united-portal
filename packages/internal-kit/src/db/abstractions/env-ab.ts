import {env} from "../schemas/env";
import {db} from "../db";
import {sql} from "drizzle-orm";

export const EnvAB = {
    portalHasSetup: async (): Promise<boolean> => {
        const envJSON = await EnvAB.read()

        return envJSON.hasOwnProperty('theme');
    },
    read: async () => {
        const envRows = await db.select().from(env)

        const result: Record<string, any> = {};

        for (const item of envRows) {
            const idParts = item.id.split('_');

            if (idParts.length === 1) {
                // Simple case: no underscore, direct assignment
                result[item.id] = item.value;
            } else {
                // Nested case: has underscores, create nested structure
                const [mainId, ...subIds] = idParts;

                // Guard against undefined mainId
                if (!mainId) {
                    continue; // Skip invalid entries
                }

                const subId = subIds.join('_'); // In case there are multiple underscores

                // Initialize the main object if it doesn't exist
                if (!result[mainId]) {
                    result[mainId] = {};
                }

                // Assign the value to the nested structure
                result[mainId][subId] = item.value;
            }
        }

        return result;
    },
    write: async (obj: Record<string, any>) => {
        const result: { id: string; value: string; }[] = [];

        function flatten(current: Record<string, any>, parentKey: string = ''): void {
            for (const [key, value] of Object.entries(current)) {
                const currentId = parentKey ? `${parentKey}_${key}` : key;

                if (typeof value === 'string') {
                    // Base case: value is a string, add to result
                    result.push({ id: currentId, value });
                } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    // Recursive case: value is an object, flatten it
                    flatten(value, currentId);
                } else {
                    // Handle other types (numbers, booleans, etc.) by converting to string
                    result.push({ id: currentId, value: String(value) });
                }
            }
        }

        flatten(obj);

        await db.insert(env).values(result).onConflictDoUpdate({
            target: env.id,
            set: { value: sql`excluded.value` }
        })
    }
}