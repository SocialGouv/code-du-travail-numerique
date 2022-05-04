import { useForm } from "react-final-form";

const DebugInfo = (): JSX.Element => {
  const form = useForm();
  return (
    <details>
      <summary>state</summary>
      <pre>{JSON.stringify(form.getState().values, null, 2)}</pre>
    </details>
  );
};

export default DebugInfo;
