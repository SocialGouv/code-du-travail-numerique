import Link from "next/link";
import { Paragraph } from "@socialgouv/cdtn-ui";

type Props = {
  article?: JSX.Element;
  message?: string;
};

const defaultMessage =
  "Le montant donné n’est qu’une estimation, il est donné à titre indicatif. Pour simplifier l’utilisation de ce simulateur, certains paramètres complexes n’ont pas été pris en compte dans le calcul de l’indemnité et peuvent donner lieu à un montant différent. Par exemple, les absences de moins d’un mois ou les contrats antérieurs au CDI ne sont pas pris en compte dans le calcul de l’ancienneté du salarié.";

export default function ForMoreInfo({ article, message = defaultMessage }: Props) {
  return (
    <>
      {article}
      <Paragraph italic fontSize="small">
        {message}
      </Paragraph>
    </>
  );
}
