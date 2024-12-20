import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        remix({
            ignoredRouteFiles: ["**/*.css"],
            // routes(defineRoutes) {
            //     return defineRoutes((route) => {
            //         route("/concerts", "routes/concerts/route.tsx", () => {
            //             route("/concerts/new", "routes/concerts.new/route.tsx", () => {
            //                 route("/concerts/new/new-test", "routes/concerts.new.new-test/route.tsx", { index: true });
            //                 route("/concerts/new/new-test2", "routes/concerts.new.new-test2/route.tsx");
            //             });
            //         });
            //     });
            // },
        }),
        tsconfigPaths(),
    ],
    server: {
        port: 4399,
        host: "0.0.0.0",
    },
});
