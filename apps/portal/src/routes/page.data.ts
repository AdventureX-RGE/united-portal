import type {LoaderFunctionArgs} from '@modern-js/runtime/router';
import * as process from "node:process";

export type DataLoaderRes = {
    providerList: Array<{
        name: string,
        entry: string,
        id: string;
    }>
}


export const loader = async ({request}: LoaderFunctionArgs): Promise<DataLoaderRes> => {
    return {
        providerList: [{
            name: "provider",
            entry: `${process.env.MAPLE_URL}/theme/default/static/mf-manifest.json`,
            id: "provider/Image"
        }]
    }
};