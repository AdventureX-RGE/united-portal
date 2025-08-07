import {promises as fs} from 'fs';
import path from 'path';
import {log} from '@clack/prompts';

export async function setupTemplateFiles(): Promise<void> {
    const templateDir = path.resolve('templates');
    const rootDir = path.resolve('../../');

    try {
        // Read all files from the template directory
        const files = await fs.readdir(templateDir);

        for (const file of files) {
            const srcPath = path.join(templateDir, file);
            let destPath = path.join(rootDir, file);

            // If the file is .env.template, remove ".template" from the destination file name
            if (file === '.env.template') {
                destPath = path.join(rootDir, '.env');
            }

            if (file === '.dockerignore.template') {
                destPath = path.join(rootDir, '.dockerignore');
            }

            // Copy file to root directory
            await fs.copyFile(srcPath, destPath);
        }
    } catch (error) {
        log.error(`Error while copying template files: ${error}`)
        return process.exit(0)
    }
}