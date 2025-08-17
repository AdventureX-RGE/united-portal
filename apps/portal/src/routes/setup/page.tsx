import {useLoaderData} from "@modern-js/runtime/router";
import {getInstance, loadRemote, registerRemotes} from "@module-federation/modern-js/runtime";
import {createLazyComponent} from "@module-federation/modern-js/react";
import type {DataLoaderRes} from "@/routes/setup/page.data";

export default () => {
    const dataLoader = useLoaderData() as DataLoaderRes;

    registerRemotes(dataLoader.providerList)

    const DynamicRemoteSSRComponents = dataLoader.providerList.map(item => {
        const {id} = item;
        const Com = createLazyComponent({
            instance: getInstance(),
            loader: () => loadRemote(id),
            loading: 'loading...',
            fallback: ({error}) => {
                if (error.message.includes('not exist')) {
                    return <div>fallback - not existed id</div>;
                }
                return (<></>);
            },
        });
        return <Com key={id}/>
    })

    return (<div className={'p-10'}>
        {DynamicRemoteSSRComponents}
    </div>)
}