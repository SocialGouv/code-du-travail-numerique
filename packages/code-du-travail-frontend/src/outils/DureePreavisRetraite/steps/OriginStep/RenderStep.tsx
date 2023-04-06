import React, { useContext } from "react";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../../state";
import OriginStep from "./Step";

function RenderOriginStep(): JSX.Element {
  const store = useContext(PreavisRetraiteContext);
  const { showWarning, onChange } = usePreavisRetraiteStore(store, (state) => ({
    showWarning: state.steps.origin.showWarning,
    onChange: state.onOriginChange,
  }));
  return <OriginStep showWarning={showWarning} onChange={onChange} />;
}

export default RenderOriginStep;
