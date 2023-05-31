import Link from "next/link";
import styled from "styled-components";
import { theme } from "@socialgouv/cdtn-ui";

export default function ForMoreInfo() {
  return (
    <>
      <p>
        Pour en savoir plus sur l’indemnité de licenciement et son mode de
        calcul, consultez{" "}
        <Link
          href={`/fiche-service-public/indemnite-de-licenciement-du-salarie-en-cdi`}
          passHref
          target={"_blank"}
        >
          cet article
        </Link>
        .
      </p>
      <StyledI>
        Le montant donné n’est qu’une estimation, il est donné à titre
        indicatif. Pour simplifier l’utilisation de ce simulateur, certains
        paramètres complexes n’ont pas été pris en compte dans le calcul de
        l’indemnité et peuvent donner lieu à un montant différent. Par exemple,
        les absences de moins d’un mois ou les contrats antérieurs au CDI ne
        sont pas pris en compte dans le calcul de l’ancienneté du salarié.
      </StyledI>
    </>
  );
}
const { fonts } = theme;

const StyledI = styled.i`
  font-size: ${fonts.sizes.small};
`;
