type Props = {
  formValues: unknown;
};

const Index = ({ formValues }: Props): JSX.Element => (
  <details>
    <summary>state</summary>
    <pre>{JSON.stringify(formValues, null, 2)}</pre>
  </details>
);

export default Index;
