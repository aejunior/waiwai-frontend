import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import svgr from "vite-plugin-svgr";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), tsconfigPaths()],
    resolve: {
        alias: {
            "@/": path.resolve(__dirname, "./src"),
            "@/utils": path.resolve(__dirname, "./src/utils"),
            "@/pages": path.resolve(__dirname, "./src/pages"),
            "@/types": path.resolve(__dirname, "./src/types"),
            "@/assets": path.resolve(__dirname, "./src/assets"),
            "@/components": path.resolve(__dirname, "./src/components"),
            "@/icons": path.resolve(__dirname, "./src/components/Icons"),
            "@/constraints": path.resolve(__dirname, "./src/constraints"),
            "@/layouts": path.resolve(__dirname, "./src/components/Layouts"),
            "@/hooks": path.resolve(__dirname, "./src/hooks"),
            "@/contexts": path.resolve(__dirname, "./src/contexts"),
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 80, // must be a port other than 5173
    },
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
    // build: {
    //     outDir: "./dist",
    //     emptyOutDir: true, // also necessary
    // },
});
