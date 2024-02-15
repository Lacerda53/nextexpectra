/**
 * This script is used to rename the binary with the platform specific postfix.
 * When `tauri build` is ran, it looks for the binary name appended with the platform specific postfix.
 */

import { execa } from "execa";
import { watch as _watch } from "chokidar";

async function build() {
  try {
    await execa("node", ["scripts/build-server.mjs"], {
      all: true,
    }).stderr.pipe(process.stdout);
  } catch (error) {
    console.error(error);
  }
}

async function watch() {
  const watcher = _watch("server/*", {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
  });

  watcher.on("change", build);

  build();
}

watch().catch((error) => {
  throw error;
});
