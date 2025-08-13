import { createModuleFederationConfig } from '@module-federation/modern-js';

export default createModuleFederationConfig({
    name: 'host',
    remotes: {},
    shared: {
        react: {
            singleton: true,
            requiredVersion: '^18.0.0',
        },
        'react-dom': {
            singleton: true,
            requiredVersion: '^18.0.0',
        }
    },
});