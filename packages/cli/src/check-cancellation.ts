import {cancel, isCancel} from "@clack/prompts";

export function checkCancellation(symbol: string | symbol) {
    if (isCancel(symbol)) {
        cancel(`Operation cancelled. Setup failed!`)
        return process.exit(0)
    }
}