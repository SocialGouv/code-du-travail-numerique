type Props = {
  data: Record<string, unknown>;
};

const DebugInfo = (props: Props): JSX.Element => {
  return (
    <details
      style={{
        cursor: "pointer",
      }}
    >
      <summary>State</summary>
      <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </details>
  );
};

export default DebugInfo;
