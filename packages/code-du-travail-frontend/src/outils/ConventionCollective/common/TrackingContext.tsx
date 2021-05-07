import pDebounce from "p-debounce";
import React, { createContext, useContext } from "react";
import { v4 as generateUUID } from "uuid";

import { matopush } from "../../../piwik";

type TrackingContext = {
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
  title: null,
  trackEvent: null,
  uuid: null,
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
  const debuncedTrackEvent = pDebounce(trackEvent, 2000);
  return (
    <Provider value={{ title, trackEvent: debuncedTrackEvent, uuid }}>
      {children}
    </Provider>
  );
}
