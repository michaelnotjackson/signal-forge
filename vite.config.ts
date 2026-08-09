import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { astryxStylex } from "@astryxdesign/build/vite";

export default defineConfig({
  plugins: [
    ...astryxStylex({
      stylexOptions: {
        dev: process.env.NODE_ENV === "development",
        runtimeInjection: false,
        treeshakeCompensation: true,
      },
    }),
    reactRouter(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
