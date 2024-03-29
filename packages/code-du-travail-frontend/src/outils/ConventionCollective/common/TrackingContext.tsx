import { push as matopush } from "@socialgouv/matomo-next";
import React, { createContext, useContext } from "react";
import { v4 as generateUUID } from "uuid";

export type TrackEventFn = (
  category: string,
  action: string,
  name?: string,
  value?: string
) => void;

export type TrackingContext = {
  trackEvent: TrackEventFn;
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
