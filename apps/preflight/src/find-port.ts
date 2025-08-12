import {createServer} from 'net';

const isPortAvailable = (port: number): Promise<boolean> => {
    return new Promise((resolve) => {
        const server = createServer();
        server.listen(port, () => {
            server.close();
            resolve(true);
        });
        server.on('error', () => {
            resolve(false);
        });
    });
};

export async function findAvailableThemePort() {
    let port = 41000;
    while (!(await isPortAvailable(port)) && port < 42000) {
        port++;
    }
    if (port >= 42000) {
        throw new Error('No available ports found in range 41000-41999');
    }
    return port;
}