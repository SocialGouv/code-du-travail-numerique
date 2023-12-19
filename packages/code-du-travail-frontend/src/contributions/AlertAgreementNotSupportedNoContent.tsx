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

export const AlertAgreementSupportedNoContent = ({ message }: Props) => {
  return (
    <>
      <Paragraph variant="primary" fontWeight="700" noMargin>
        Cette convention collective ne prévoit rien
      </Paragraph>
      <p>La convention collective sélectionnée ne prévoit rien sur ce sujet.</p>
      <p>{message}</p>
    </>
  );
};
