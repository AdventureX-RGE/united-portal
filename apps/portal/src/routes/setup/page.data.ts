import type {LoaderFunctionArgs} from "@modern-js/runtime/router";
import process from "node:process";

export type DataLoaderRes = {
    providerList: Array<{
        name: string,
        entry: string,
        id: string;
    }>
}

export const loader = async ({request}: LoaderFunctionArgs) => {
    return {
        providerList: [{
            name: "provider",
            entry: `${process.env.MAPLE_URL}/theme/default/static/mf-manifest.json`,
            id: "provider/TextField"
        }]
    }
};