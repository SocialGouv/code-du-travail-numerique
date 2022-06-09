type Props = {
  data: Record<string, any>;
};

const DebugInfo = (props: Props): JSX.Element => {
  return (
    <details>
      <summary>state</summary>
      <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </details>
  );
};

export default DebugInfo;
