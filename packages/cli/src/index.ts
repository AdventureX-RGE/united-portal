import {intro, outro, text} from '@clack/prompts';
import pc from "picocolors"
import {checkCancellation} from "./check-cancellation";

async function main(): Promise<void> {
    intro(pc.inverse('setup-united-portal'));

    const hackathonName = await text({
        message: "What's the name of your hackathon?",
        placeholder: "MyHackathon"
    })

    checkCancellation(hackathonName)

    outro(pc.green('You\'re all set!'));
}

main().catch(console.error);