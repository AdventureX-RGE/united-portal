import { $ } from "bun";

export async function detectNetworkName() {
    const output = await $`docker network ls --format '{{.Name}}'`.text();
    const match = output.split("\n").find(name => name.endsWith("_up-network"));

    if (match) return match;

    return "docker_up-network";
}
