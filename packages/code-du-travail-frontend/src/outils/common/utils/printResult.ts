import { MatomoBaseEvent, MatomoSimulatorEvent } from "../../../lib";
import { push as matopush } from "@socialgouv/matomo-next";
import * as Sentry from "@sentry/nextjs";

export default function printResult(simulatorTitle: string): void {
  matopush([
    MatomoBaseEvent.TRACK_EVENT,
    MatomoBaseEvent.OUTIL,
    MatomoSimulatorEvent.CLICK_PRINT,
    simulatorTitle,
  ]);
  const detailsTags = document.getElementsByTagName("details");
  for (let i = 0; i < detailsTags.length; i++) {
    detailsTags[i].setAttribute("open", "");
  }
  try {
    window?.print();
  } catch (e) {
    console.error(e);
    Sentry.captureException(e);
  }
}
