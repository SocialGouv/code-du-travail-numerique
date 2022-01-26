import React, { createContext, useContext } from "react";
import { v4 as generateUUID } from "uuid";

import { matopush } from "../../../piwik";

export type TrackingContext = {
  trackEvent: (
    category: string,
    action: string,
    name?: string,
    value?: string
  ) => void;
  uuid: string;
  title: string;
};

export const trackingContext = createContext<TrackingContext>({
  title: "",
  trackEvent: () => {
    /* nothing to do */
  },
  uuid: "",
});

export function useTrackingContext(): TrackingContext {
  return useContext(trackingContext);
}

type Props = {
  uuid?: string;
  title: string;
  children: React.ReactNode;
};

const { Provider } = trackingContext;

export function TrackingProvider({
  title,
  children,
  uuid = generateUUID(),
}: Props): JSX.Element {
  const trackEvent = (...params) => {
    matopush(["trackEvent", ...params]);
  };
  return <Provider value={{ title, trackEvent, uuid }}>{children}</Provider>;
}
