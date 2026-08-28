import { useTracking } from "src/modules/analytics/events/useTracking";

// Le titre du simulateur suffixait l'action dans l'ancien schéma
// (`view_step_Indemnité de licenciement`), ce qui multipliait les actions par le
// nombre de simulateurs et y injectait accents et espaces. Il devient une clé de
// payload : une seule action `view_step` pour tout le site, le simulateur et
// l'étape en contexte.
export const useSimulatorLayoutTracking = () => {
  const { track } = useTracking();

  const emitNextPreviousEvent = (
    simulator: string,
    isPrevious: boolean,
    currentStepName: string
  ) => {
    track(isPrevious ? "click_previous_step" : "view_step", {
      simulator,
      step: currentStepName,
    });
  };

  const emitPrintEvent = (simulator: string) => {
    track("print_result", { simulator });
  };

  return {
    emitNextPreviousEvent,
    emitPrintEvent,
  };
};
