import {detectNetworkName} from "./docker-network.ts";
import {findAvailableThemePort} from "./find-port.ts";
import {ensureRepo} from "./repo.ts";
import {getCurrentTheme} from "./theme.ts";
import {$} from "bun";

console.log("Start Running United Portal Preflight");

async function main() {
    const NET = await detectNetworkName();
    console.log("Detected Network Name: ", NET);

    // Setup Theme

    const theme = await getCurrentTheme();
    const theme_docker_name = `up-theme-${theme.id}`;

    const theme_dest = await ensureRepo(theme, "theme")

    await $`docker build -t ${theme_docker_name} -f ${theme_dest}/Dockerfile ${theme_dest}`;

    await $`docker rm -f ${theme_docker_name}`.quiet().catch(()=>{});

    const THEME_PORT = await findAvailableThemePort();
    console.log("Available Theme Port: ", THEME_PORT);

    await $`docker run -d --name ${theme_docker_name} --network ${NET} --restart unless-stopped -p ${THEME_PORT}:8080 ${theme_docker_name}`;

    console.log(`Theme Running (${theme_docker_name})`);

    // Setup Widgets
}

main().catch(e => { console.error(e); process.exit(1); });