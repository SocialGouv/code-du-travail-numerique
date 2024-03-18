import { Paragraph } from "@socialgouv/cdtn-ui";

type Props = {
  url?: string;
  message: string;
};

export const AlertAgreementUnextended = ({ url }) => {
  return (
    <>
      <Paragraph variant="primary" fontWeight="700" noMargin>
        Nous n’avons pas de réponse pour cette convention collective
      </Paragraph>
      <p>
        Les dispositions de cette convention n’ont pas été étendues. Cela
        signifie qu&apos;elles ne s&apos;appliquent qu&apos;aux entreprises
        adhérentes à l&apos;une des organisations signataires de l&apos;accord.
        Dans ce contexte, nous ne sommes pas en mesure d&apos;identifier si
        cette règle s&apos;applique ou non au sein de votre entreprise. Vous
        pouvez toutefois consulter la convention collective{" "}
        <a target="_blank" href={url}>
          ici
        </a>{" "}
        dans le cas où elle s&apos;applique à votre situation.
      </p>
    </>
  );
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
        générales prévues par le code du travail.
      </p>
    )}
  </>
);
