import {createServer} from "http";

export function findAvailablePort(): Promise<number> {
    return new Promise((resolve, reject) => {
        let port = 3000;

        const checkPort = () => {
            const server = createServer();

            server.listen(port, () => {
                server.close(() => resolve(port));
            });

            server.on("error", (error: NodeJS.ErrnoException) => {
                if (error.code === "EADDRINUSE") {
                    port++;
                    checkPort();
                } else {
                    reject(error);
                }
            });
        };

        checkPort();
    });
}