import { useContext } from "react";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../../state";

const DebugInfo = (): JSX.Element => {
  const store = useContext(PreavisRetraiteContext);
  const data = usePreavisRetraiteStore(store, (state) => ({
    formValues: state.formValues,
    steps: state.steps,
  }));
  return (
    <details>
      <summary>state</summary>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </details>
  );
};

export default DebugInfo;
