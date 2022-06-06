import { useIndemniteLicenciementStore } from "../store";

const DebugInfo = (): JSX.Element => {
  const data = useIndemniteLicenciementStore((state) => ({
    errorCdd: state.errorCdd,
    errorFauteGrave: state.errorFauteGrave,
    typeContratTravail: state.typeContratTravail,
  }));
  return (
    <details>
      <summary>state</summary>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </details>
  );
};

export default DebugInfo;
