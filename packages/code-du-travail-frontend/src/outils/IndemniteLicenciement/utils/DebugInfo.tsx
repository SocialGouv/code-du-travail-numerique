import { useIndemniteLicenciementStore } from "../store";

const DebugInfo = (): JSX.Element => {
  const data = useIndemniteLicenciementStore((state) => ({
    ...state,
  }));
  return (
    <details>
      <summary>state</summary>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </details>
  );
};

export default DebugInfo;
