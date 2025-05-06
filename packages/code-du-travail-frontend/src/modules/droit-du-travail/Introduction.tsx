import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import Alert from "@codegouvfr/react-dsfr/Alert";

const Introduction = () => (
  <div className={fr.cx("fr-grid-row", "fr-grid-row--center")}>
    <div className={fr.cx("fr-col-12", "fr-col-md-10", "fr-col-lg-8")}>
      <h1>Le droit du travail</h1>
      <p className={fr.cx("fr-text--xl", "fr-mb-3w")}>
        Retrouvez la définition du droit du travail, les textes qui en sont à
        l’origine ainsi que leur articulation.
      </p>
      <h2>Qu&apos;est-ce que le droit du travail ?</h2>
      <p className={fr.cx("fr-text--bold", "fr-text--lg")}>
        Le droit du travail est l’ensemble des règles juridiques applicables aux
        relations entre employeurs privés et salariés, à l’occasion du travail.
      </p>
      <p className={fr.cx("fr-text--lg")}>
        Le droit du travail organise les relations professionnelles de travail
        entre l’employeur et le salarié individuellement et la collectivité des
        salariés. Il encadre de nombreux domaines tels que le contrat de
        travail, la rémunération, la durée du travail, les congés, la
        discipline, le licenciement, l’emploi, la formation, la sécurité et la
        santé au travail, la négociation collective, la grève et la
        représentation du personnel.
      </p>
      <p className={fr.cx("fr-text--lg")}>
        Le droit du travail est un droit en constante évolution car il comprend
        des enjeux sociaux, économiques et politiques forts.
      </p>
      <Alert
        severity="info"
        className={fr.cx("fr-mt-4w")}
        title="Le droit du travail, ce n'est pas..."
        description="Le droit du travail ne concerne pas les travailleurs qui sont soumis au droit public (par exemple, les fonctionnaires), les travailleurs indépendants (artisan, commerçant, professions libérales…), les bénévoles et les dirigeants d’entreprise."
      />
    </div>
  </div>
);

export default Introduction;
