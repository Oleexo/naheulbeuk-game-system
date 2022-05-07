import { UserConfig } from "vite";
import * as path from "path";
import reloadPublicDir from "./reload-public-dir";

const config: UserConfig = {
  root: "src/",
  base: "/systems/naheulbeuk/",
  publicDir: path.resolve(__dirname, "public"),
  server: {
    port: 30001,
    open: true,
    proxy: {
      "^(?!/systems/naheulbeuk)": "http://localhost:30000/",
      "/socket.io": {
        target: "ws://localhost:30000",
        ws: true,
      },
    },
  },
  build: {
    outDir: path.resolve(__dirname, "foundryvtt-data/Data/systems/naheulbeuk"),
    emptyOutDir: true,
    sourcemap: true,
    brotliSize: true,
    lib: {
      name: "naheulbeuk",
      entry: path.resolve(__dirname, "src/naheulbeuk.mjs"),
      formats: ["es"],
      fileName: "naheulbeuk",
    },
  },
  plugins: [reloadPublicDir()],
};

export default config;
