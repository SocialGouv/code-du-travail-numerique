import { Alert as UiAlert, Paragraph } from "@socialgouv/cdtn-ui";

type Props = {
  title: string;
  message: string;
};

export const Alert = ({ title, message }: Props): JSX.Element => {
  return (
    <UiAlert variant="primary">
      <Paragraph variant="primary" fontSize="default" fontWeight="700" noMargin>
        {title}
      </Paragraph>
      <Paragraph>{message}</Paragraph>
    </UiAlert>
  );
};
