import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";
import { useContext } from "react";
import { PubliQuestion } from "./components/PubliQuestion";
import { fr } from "@codegouvfr/react-dsfr";
import { eventEmitter, EventType } from "src/modules/outils/common/events";

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
            onChange={(v: any) => {
              onInformationsChange(
                info.question.rule.nom,
                v,
                info.question.rule.cdtn?.type
              );
              eventEmitter.dispatch(
                EventType.TRACK_QUESTION,
                info.question.rule.titre || info.question.rule.nom
              );
            }}
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
