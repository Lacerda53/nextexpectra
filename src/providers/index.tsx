"use client";
import { FunctionComponent, PropsWithChildren, useEffect } from "react";
import { SocketProvider } from "./websocketProvider";
import { listen, TauriEvent } from "@tauri-apps/api/event";
import { Command } from "@tauri-apps/api/shell";

export const Providers: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  /**
   * Running NodeJS process as a sidecar
   */
  useEffect(() => {
    const cmd = Command.sidecar("binaries/app");

    cmd.spawn().then((child) => {
      /**
       * Killing server process when window is closed. Probably won't
       * work for multi window application
       */
      listen(TauriEvent.WINDOW_DESTROYED, function () {
        child.kill();
      });
    });
  }, []);

  return <SocketProvider>{children}</SocketProvider>;
};
