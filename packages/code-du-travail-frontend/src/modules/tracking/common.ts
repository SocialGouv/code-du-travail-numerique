import { push } from "@socialgouv/matomo-next";
export const matopush = (args: any[]) => {
  push(["track_event", ...args]);
};
