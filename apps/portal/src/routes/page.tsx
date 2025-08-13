import {loadRemote, registerRemotes, getInstance} from '@module-federation/modern-js/runtime';
import {createLazyComponent} from '@module-federation/modern-js/react';

import type {DataLoaderRes} from './page.data';
import {useLoaderData} from '@modern-js/runtime/router';

import {Helmet} from '@modern-js/runtime/head';
import './index.css';

const Index = () => {
    const dataLoader = useLoaderData() as DataLoaderRes;

    registerRemotes(dataLoader.providerList)

    const DynamicRemoteSSRComponents = dataLoader.providerList.map(item => {
        const {id} = item;
        const Com = createLazyComponent({
            instance: getInstance(),
            loader: () => loadRemote(id),
            loading: 'loading...',
            fallback: ({error}) => {
                if (error instanceof Error && error.message.includes('not exist')) {
                    return <div>fallback - not existed id</div>;
                }
                return <div>fallback</div>;
            },
        });
        return <Com key={id}/>
    })

    return (
        <div className="container-box">
            {DynamicRemoteSSRComponents}
        </div>
    );
}

export default Index;
