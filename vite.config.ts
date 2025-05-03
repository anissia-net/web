import {fileURLToPath, URL} from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig(({command, mode}) => {
    const env = loadEnv(mode, './', 'VITE_') as any;

    const options = {
        plugins: [
            vue(),
            tailwindcss(),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
        },
    };

    if (command == 'serve') {
        (options as any).server = {
            host: '0.0.0.0',
            proxy: {
                '^/api/': {
                    target: env.VITE_API_HOST,
                    ws: true,
                    changeOrigin: true,
                    rewrite: (path: string) => path.replace('/api/', '/')
                }
            }
        }
    }

    return options;
})
