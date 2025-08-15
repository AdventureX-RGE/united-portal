import type {LoaderFunctionArgs} from '@modern-js/runtime/router';
import * as process from "node:process";
import { redirect } from '@modern-js/runtime/router';
import {EnvAB} from "@united-portal/internal-kit";

export type DataLoaderRes = {
    providerList: Array<{
        name: string,
        entry: string,
        id: string;
    }>
}


export const loader = async ({request}: LoaderFunctionArgs) => {
    if (!(await EnvAB.portalHasSetup())) {
        return redirect("/setup")
    }

    return {
        providerList: [{
            name: "provider",
            entry: `${process.env.MAPLE_URL}/theme/default/static/mf-manifest.json`,
            id: "provider/Image"
        }]
    }
};