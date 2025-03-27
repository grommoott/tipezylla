import { defineConfig } from "vite"
import preact from "@preact/preset-vite"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
    plugins: [preact(), tailwindcss()],
    resolve: {
        alias: {
            "@app": process.cwd() + "/src/1.App/",
            "@widgets": process.cwd() + "/src/3.Widgets/",
            "@entities": process.cwd() + "/src/5.Entities/",
            "@shared": process.cwd() + "/src/6.Shared/",
            "@store": process.cwd() + "/src/6.Shared/store",
            "@hooks": process.cwd() + "/src/6.Shared/hooks",
            "@config": process.cwd() + "/src/6.Shared/config",
            "@types": process.cwd() + "/src/6.Shared/types",
            "@api": process.cwd() + "/src/6.Shared/api/",
        },
    },
})
