import {appTools, defineConfig} from '@modern-js/app-tools';
import {moduleFederationPlugin} from '@module-federation/modern-js';
import {routerPlugin} from '@modern-js/plugin-router-v7'

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
    runtime: {
        router: true,
    },
    server: {
        ssr: {
            mode: 'stream'
        }
    },
    plugins: [
        appTools({
            bundler: 'rspack', // Set to 'webpack' to enable webpack
        }),
        moduleFederationPlugin(),
        routerPlugin(),
    ],
});
