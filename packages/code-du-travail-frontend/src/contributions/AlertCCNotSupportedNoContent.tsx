import { Paragraph } from "@socialgouv/cdtn-ui";

type Props = {
  url: string;
  message: string;
  showAnswer: boolean;
};

export const AlertCCNotSupportedNoContent = ({
  url,
  showAnswer,
  message,
}: Props) => {
  return (
    <>
      <Paragraph variant="primary" fontSize="default" fontWeight="700" noMargin>
        Cette convention collective ne prévoit rien
      </Paragraph>
      <p>La convention collective sélectionnée ne prévoit rien sur ce sujet.</p>
      {showAnswer ? (
        <p>Vous pouvez consulter les informations générales ci-dessous.</p>
      ) : (
        <p>
          Vous pouvez tout de même poursuivre pour obtenir les informations
          générales.
        </p>
      )}
      <p>{message}</p>
    </>
  );
};
