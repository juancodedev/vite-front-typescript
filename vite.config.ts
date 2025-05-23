import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    base: "/",
    plugins: [react()],
    server: {
        host: true,
        port: 5173,
        watch: {
            usePolling: true,
        },
    },
});