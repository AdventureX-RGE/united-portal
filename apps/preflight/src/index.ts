import {detectNetworkName} from "./docker-network.ts";

console.log("Start Running United Portal Preflight");

async function main() {
    const NET = await detectNetworkName();
    console.log("Detected Network Name: ", NET);


}

main().catch(e => { console.error(e); process.exit(1); });