import { exec, execFile } from 'child_process';
import path, { resolve } from "path";
import { HmrContext, PluginOption } from "vite";

function handleHotUpdate({ file, server }: HmrContext) {
  const {logger, publicDir} = server.config;

  if (path.normalize(file).startsWith(path.normalize(publicDir))) {
    exec(`npm run build`, (error, stdout, stderr) => {
      logger.info(`[vite-plugin-reload-public-dir] ${stdout}`);
      if (error) {
        logger.warn(`[vite-plugin-reload-public-dir] ${error}`);
        logger.error(`[vite-plugin-reload-public-dir] ${stderr}`);
      }
      logger.info(`[vite-plugin-reload-public-dir] reloading`);
      server.ws.send({ type: 'full-reload' });
    });
  }
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
    handleHotUpdate,
  };
};
