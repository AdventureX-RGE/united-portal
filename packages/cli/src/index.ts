import { intro, outro } from '@clack/prompts';
import pc from "picocolors"

async function main(): Promise<void> {
    intro(pc.inverse('setup-united-portal'));

    outro(pc.green('You\'re all set!'));
}

main().catch(console.error);