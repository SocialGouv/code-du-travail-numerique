import { Paragraph } from "@socialgouv/cdtn-ui";

type Props = {
  url?: string;
  message: string;
};

export const AlertAgreementNotSupportedNoContent = ({
  url,
  message,
}: Props) => {
  return (
    <>
      <Paragraph variant="primary" fontWeight="700" noMargin>
        Nous n’avons pas de réponse pour cette convention collective
      </Paragraph>
      <p>
        Nous vous invitons à consulter votre convention collective qui peut
        prévoir une réponse. Vous pouvez consulter votre convention collective{" "}
        <a target="_blank" href={url}>
          ici
        </a>
        .
      </p>
      <p>{message}</p>
    </>
  );
};

export const AlertAgreementSupportedNoContent = () => (
  <>
    <Paragraph variant="primary" fontWeight="700" noMargin>
      Cette convention collective ne prévoit rien
    </Paragraph>
    <p>La convention collective sélectionnée ne prévoit rien sur ce sujet.</p>
    <p>
      Un accord d’entreprise ou le contrat de travail peut cependant prévoir des
      règles spécifiques sur ce sujet.
    </p>
  </>
);

export const AlertAgreementSupported = ({
  showAnswer,
}: {
  showAnswer: boolean;
}) => (
  <>
    <Paragraph variant="primary" fontSize="default" fontWeight="700" noMargin>
      Nous n’avons pas de réponse pour cette convention collective
    </Paragraph>
    {showAnswer ? (
      <p>Vous pouvez consulter les informations générales ci-dessous.</p>
    ) : (
      <p>
        Vous pouvez tout de même poursuivre pour obtenir les informations
        générales.
      </p>
    )}
  </>
);
