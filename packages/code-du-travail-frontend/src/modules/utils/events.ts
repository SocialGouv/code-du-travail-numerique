import { push } from "@socialgouv/matomo-next";

enum MatomoBaseEvent {
  TRACK_EVENT = "trackEvent",
}

type BaseProps = {
  category: string;
  action: string;
};

type PropsWithBaseElement = BaseProps & {
  name?: never;
  value?: never;
};

type PropsWithName = BaseProps & {
  name: string;
  value?: never;
};

type PropsWithValue = BaseProps & {
  name: string;
  value: string;
};

type Props = PropsWithBaseElement | PropsWithName | PropsWithValue;

function isPropsWithName(props: Props): props is PropsWithName {
  return (props as PropsWithName).name !== undefined;
}

function isPropsWithValue(props: Props): props is PropsWithValue {
  return (props as PropsWithValue).value !== undefined;
}

export function sendEvent(props: Props) {
  if (isPropsWithValue(props)) {
    push([
      MatomoBaseEvent.TRACK_EVENT,
      props.category,
      props.action,
      props.name,
      props.value,
    ]);
  } else if (isPropsWithName(props)) {
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
