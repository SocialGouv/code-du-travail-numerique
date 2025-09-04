import React, { useContext } from "react";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../store";
import { RadioQuestion } from "src/modules/outils/common/components";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import { fr } from "@codegouvfr/react-dsfr";

const StepOrigin = () => {
  const store = useContext(PreavisRetraiteContext);

  const { originDepart, onChangeOriginDepart, errorOriginDepart } =
    usePreavisRetraiteStore(store, (state) => ({
      originDepart: state.originDepartData.input.originDepart,
      onChangeOriginDepart: state.originDepartFunction.onChangeOriginDepart,
      errorOriginDepart: state.originDepartData.error.errorOriginDepart,
    }));

  return (
    <>
      <RadioQuestion
        questions={[
          {
            label: "Le salarié décide lui-même de partir à la retraite",
            value: "depart-retraite",
            id: "depart-retraite",
          },
          {
            label: "L'employeur décide de mettre le salarié à la retraite",
            value: "mise-retraite",
            id: "mise-retraite",
          },
        ]}
        name="originDepart"
        label="Qui est à l'origine du départ en retraite&nbsp;?"
        selectedOption={originDepart}
        onChangeSelectedOption={onChangeOriginDepart}
        error={errorOriginDepart}
      />
      {originDepart === "mise-retraite" && (
        <div className={fr.cx("fr-mt-2w")}>
          <AccessibleAlert
            severity="info"
            title="À noter"
            data-testid="warning-origin-depart"
            description={
              <>
                L&apos;employeur qui décide une mise à la retraite doit en avoir
                informé son salarié.
                <br />
                Plus d&apos;info&nbsp;:{" "}
                <a
                  href="/fiche-service-public/un-employeur-peut-il-mettre-doffice-un-salarie-a-la-retraite"
                  target="_blank"
                >
                  L&apos;employeur peut-il mettre d&apos;office un salarié à la
                  retraite ?
                </a>
              </>
            }
          />
        </div>
      )}
    </>
  );
};

export default StepOrigin;
