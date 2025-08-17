import type {Theme} from "./theme.ts";
import type {Widget} from "./widget.ts";
import { $ } from "bun";

export async function ensureRepo(repo: Theme | Widget, type: "theme" | "widget") {
    const DEST = `/opt/${type}s/${repo.id}`;
    const exists = await $`test -d ${DEST}/.git`.quiet().then(()=>true).catch(()=>false);

    // TODO: Improve Update Logic

    // if (!exists) await $`git clone ${repo.repo} ${DEST}`;

    if (exists) await $`rm -rf ${DEST}`;
    await $`git clone ${repo.repo} ${DEST}`;

    return DEST
}