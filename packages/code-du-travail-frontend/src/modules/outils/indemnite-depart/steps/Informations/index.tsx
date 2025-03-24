import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";
import { useContext } from "react";
import { PubliQuestion } from "./components/PubliQuestion";
import { fr } from "@codegouvfr/react-dsfr";

const InformationsStep = (): JSX.Element => {
  const store = useContext(IndemniteDepartContext);
  const { errors, onInformationsChange, informations } =
    useIndemniteDepartStore(store, (state) => ({
      errors: state.informationsData.error,
      onInformationsChange: state.informationsFunction.onInformationsChange,
      informations: state.informationsData.input.publicodesInformations,
    }));

  return (
    <>
      {informations.map((info, index) => {
        return (
          <PubliQuestion
            key={info.id}
            name={"infos." + info.question.name}
            rule={info.question.rule}
            value={info.info}
            onChange={(v: any) =>
              onInformationsChange(
                info.question.rule.nom,
                v,
                info.question.rule.cdtn?.type
              )
            }
            error={
              errors.errorInformations[info.question.rule.nom] ?? undefined
            }
            autoFocus={index === 0}
          />
        );
      })}
      {errors.errorPublicodes && (
        <p className={fr.cx("fr-error-text")}>{errors.errorPublicodes}</p>
      )}
    </>
  );
};

export default InformationsStep;
