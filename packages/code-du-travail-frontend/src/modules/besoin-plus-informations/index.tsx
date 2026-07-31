import { fr } from "@codegouvfr/react-dsfr";
import { Container } from "../layout/Container";
import { ContactJourney } from "./ContactJourney";

export const BesoinPlusInformations = () => (
  <Container>
    <h1 className={fr.cx("fr-mt-0")}>Contacter nos services en région</h1>
    <p className={fr.cx("fr-mt-6w", "fr-mb-6w", "fr-text--lg")}>
      Les services du ministère du Travail en région informent, conseillent et
      orientent les salariés et les employeurs du secteur privé sur leurs
      questions en droit du travail.
    </p>
    <ContactJourney />
  </Container>
);
