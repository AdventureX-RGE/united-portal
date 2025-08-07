import {writeFileSync, readFileSync} from 'fs';
import {resolve} from 'path';

export function setEnv(key: string, value: string) {
    const envPath = resolve('../../.env');
    let envContent = '';

    try {
        envContent = readFileSync(envPath, 'utf8');
    } catch {
        // If the .env file doesn't exist, we'll create one later
    }

    const lines = envContent.split('\n');
    const keyRegex = new RegExp(`^${key}=.*$`);
    let found = false;

    const updatedLines = lines.map((line) => {
        if (keyRegex.test(line)) {
            found = true;
            return `${key}=${value}`;
        }
        return line;
    });

    if (!found) {
        updatedLines.push(`${key}=${value}`);
    }

    writeFileSync(envPath, updatedLines.join('\n'));
}