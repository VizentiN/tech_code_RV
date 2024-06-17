import { defineConfig } from 'vite';
import { resolve } from 'path';
import vitePluginString from 'vite-plugin-string';

export default defineConfig({
    plugins: [
        vitePluginString()
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                orderStatus: resolve(__dirname, 'order-status.html')
                }
            }
        },
    css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "./src/styles/_variables.scss";`
                }
            }
        }
});