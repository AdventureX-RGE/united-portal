import type {LoaderFunctionArgs} from '@modern-js/runtime/router';

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
            entry: "http://localhost:41000/static/mf-manifest.json",
            id: "provider/Image"
        }]
    }
};