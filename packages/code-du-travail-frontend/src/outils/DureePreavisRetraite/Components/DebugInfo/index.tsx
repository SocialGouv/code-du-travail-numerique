import { usePreavisRetraiteStore } from "../../index";

const DebugInfo = (): JSX.Element => {
  const data = usePreavisRetraiteStore((state) => ({
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
