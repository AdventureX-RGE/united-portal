import {execa} from "execa";
import {log} from '@clack/prompts';

export async function startDockerCompose() {
    try {
        await execa('docker', ['compose', '-f', '../../docker-compose.yml', 'up', '-d'], {
            stdio: 'ignore'
        });

        // Wait a moment for services to fully start
        await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
        log.error(`Error while starting docker compose: ${error}`)
        return process.exit(0)
    }
}