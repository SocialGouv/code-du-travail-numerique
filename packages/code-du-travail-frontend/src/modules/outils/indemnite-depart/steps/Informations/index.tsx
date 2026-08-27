import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";
import { useContext, useEffect } from "react";
import { PubliQuestion } from "./components/PubliQuestion";
import { fr } from "@codegouvfr/react-dsfr";
import { RadioQuestion } from "../../../common/components";

const InformationsStep = () => {
  const store = useContext(IndemniteDepartContext);
  const {
    errors,
    onInformationsChange,
    informations,
    licenciementInaptitude,
    showLicenciementInaptitude,
    onChangeLicenciementInaptitude,
    errorLicenciementInaptitude,
    showOriginRetraite,
    originRetraite,
    onChangeOriginRetraite,
    errorOriginRetraite,
  } = useIndemniteDepartStore(store, (state) => ({
    showLicenciementInaptitude:
      state.informationsData.input.showLicenciementInaptitude,
    showOriginRetraite: state.informationsData.input.showOriginRetraite,
    originRetraite: state.informationsData.input.originRetraite,
    onChangeOriginRetraite: state.informationsFunction.onChangeOriginRetraite,
    errorOriginRetraite: state.informationsData.error.errorOriginRetraite,
    licenciementInaptitude: state.informationsData.input.licenciementInaptitude,
    onChangeLicenciementInaptitude:
      state.informationsFunction.onChangeLicenciementInaptitude,
    errorLicenciementInaptitude:
      state.informationsData.error.errorLicenciementInaptitude,
    errors: state.informationsData.error,
    onInformationsChange: state.informationsFunction.onInformationsChange,
    informations: state.informationsData.input.publicodesInformations,
  }));

  return (
    <>
      {showOriginRetraite && (
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
          name="originRetraite"
          label="Qui est à l'origine du départ en retraite&nbsp;?"
          selectedOption={originRetraite}
          onChangeSelectedOption={onChangeOriginRetraite}
          error={errorOriginRetraite}
        />
      )}
      {showLicenciementInaptitude && (
        <RadioQuestion
          questions={[
            {
              label: "Oui",
              value: "oui",
              id: "inaptitude-oui",
            },
            {
              label: "Non",
              value: "non",
              id: "inaptitude-non",
            },
          ]}
          name="licenciementInaptitude"
          label="Le licenciement fait-il suite à une inaptitude professionnelle (suite à un accident du travail ou une maladie professionnelle reconnue)&nbsp;?"
          selectedOption={licenciementInaptitude}
          onChangeSelectedOption={onChangeLicenciementInaptitude}
          error={errorLicenciementInaptitude}
        />
      )}
      {!showLicenciementInaptitude ||
      (showLicenciementInaptitude && licenciementInaptitude)
        ? informations.map((info) => {
            return (
              <PubliQuestion
                key={info.id}
                name={"infos-" + info.question.name}
                rule={info.question.rule}
                value={info.info}
                onChange={(v: any) => {
                  onInformationsChange(
                    info.question.rule.nom,
                    v,
                    info.question.rule.cdtn?.type
                  );
                }}
                error={
                  errors.errorInformations[info.question.rule.nom] ?? undefined
                }
              />
            );
          })
        : undefined}
      {errors.errorPublicodes && (
        <p className={fr.cx("fr-error-text")}>{errors.errorPublicodes}</p>
      )}
    </>
  );
};

export default InformationsStep;
