import { push } from "@socialgouv/matomo-next";

enum MatomoBaseEvent {
  TRACK_EVENT = "trackEvent",
}

type Props = {
  category: string;
  action: string;
  name?: string;
  value?: string;
};

export function sendEvent(props: Props) {
  if (props.name && props.value) {
    push([
      MatomoBaseEvent.TRACK_EVENT,
      props.category,
      props.action,
      props.name,
      props.value,
    ]);
  } else if (props.name) {
    push([
      MatomoBaseEvent.TRACK_EVENT,
      props.category,
      props.action,
      props.name,
    ]);
  } else {
    push([MatomoBaseEvent.TRACK_EVENT, props.category, props.action]);
  }
}
