import { exec, execFile } from "child_process";
import path, { resolve } from "path";
import { build, HmrContext, PluginOption, ViteDevServer } from "vite";

function handleHotUpdate() {
  let timeoutId: NodeJS.Timeout = null;

  return ({ file, server }: HmrContext) => {
    const { publicDir } = server.config;

    if (path.normalize(file).startsWith(path.normalize(publicDir))) {
      if (timeoutId != null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        execViteBuildAndReload(server)
        timeoutId = null;
      }, 500);
    }
  };
}

async function execViteBuildAndReload(server: ViteDevServer) {
  await build();
  server.ws.send({ type: "full-reload" });
}

export default (): PluginOption => {
  return {
    name: "vite-plugin-reload-public-dir",
    apply: "serve",
    config: () => ({
      server: {
        watch: {
          disableGlobbing: false,
        },
      },
    }),
    configureServer: ({ watcher, config: { publicDir } }) => {
      watcher.add(resolve(publicDir, "**/*"));
    },
    handleHotUpdate: handleHotUpdate(),
  };
};
