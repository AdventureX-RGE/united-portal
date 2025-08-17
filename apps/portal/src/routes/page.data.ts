import { redirect } from '@modern-js/runtime/router';
import {EnvAB} from "@united-portal/internal-kit";

export const loader = async () => {
    if (!(await EnvAB.portalHasSetup())) {
        return redirect("/setup")
    }

    return
};