import React from "react";
import { usePreavisRetraiteStore } from "../../state";
import OriginStep from "./Step";

function RenderOriginStep(): JSX.Element {
  const { showWarning, onChange } = usePreavisRetraiteStore((state) => ({
    showWarning: state.steps.origin.showWarning,
    onChange: state.onOriginChange,
  }));
  return <OriginStep showWarning={showWarning} onChange={onChange} />;
}

export default RenderOriginStep;
