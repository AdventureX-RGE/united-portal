import {intro, outro, text, spinner} from '@clack/prompts';
import pc from "picocolors"
import {checkCancellation} from "./check-cancellation";
import {findAvailablePort} from "./find-available-port";
import { $ } from "bun";
import {setupTemplateFiles} from "./setup-template-files";
import {setEnv} from "./set-env";

async function main(): Promise<void> {
    intro(pc.inverse('setup-united-portal'));
    
    await setupTemplateFiles()

    const hackathonName = await text({
        message: "What's the name of your hackathon?",
        placeholder: "MyHackathon"
    })

    checkCancellation(hackathonName)
    setEnv('HACKATHON_NAME', hackathonName as string)

    const serverStartSpinner = spinner()

    serverStartSpinner.start("Starting United Portal...")

    const port = await findAvailablePort()
    setEnv('PORT', port.toString())

    serverStartSpinner.stop(pc.blue(`United Portal is running on http://0.0.0.0:${port}`))

    outro(pc.green('You\'re all set!'));
}

main().catch(console.error);