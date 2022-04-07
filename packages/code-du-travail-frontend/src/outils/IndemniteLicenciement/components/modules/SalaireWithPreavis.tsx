import { YesNoQuestion } from "../../../common/YesNoQuestion";
import { Field } from "react-final-form";
import {
  IndemniteLicenciementFormContent,
  Salary,
} from "../../../common/type/WizardType";
import { FormApi } from "final-form";
import { useEffect } from "react";
import { computeSalaireRefLegal } from "@socialgouv/modeles-social/bin/rules";
import AskSalaires from "./AskSalaires";

const getSalairesPeriods = (): Salary[] => {
  return [
    {
      label: "salaire 1",
      salary: null,
    },
    {
      label: "salaire 2",
      salary: null,
    },
    {
      label: "salaire 3",
      salary: null,
    },
  ];
};

const SalaireWithPreavis = ({
  form,
}: {
  form: FormApi<IndemniteLicenciementFormContent>;
}): JSX.Element => {
  const values = form.getState().values;

  useEffect(() => {
    let salaireRef: number | undefined = undefined;
    const salaries: number[] = [];
    if (values.hasPreavis) {
      values.preavis_salaires
        ?.map((item) => item.salary)
        .filter((item) => item !== null)
        .forEach((item) => (item ? salaries.push(Number(item)) : item));
    }
    if (values.hasSameSalaire === true && values.salaire) {
      for (let i = salaries.length - 1; i < 12; i++) {
        salaries.push(Number(values.salaire));
      }

      salaireRef = computeSalaireRefLegal(salaries);
    } else if (values.hasSameSalaire === false && values.salaires) {
      salaireRef = computeSalaireRefLegal(
        values.salaires.map((item) => Number(item.salary))
      );
    }
    if (salaireRef) {
      form.change("salaireAgreementRef", salaireRef);
    }
  }, [values]);

  return (
    <>
      <YesNoQuestion
        name="hasPreavis"
        label="Avez-vous un préavis ?"
        onChange={(hasPreavis) => {
          if (!hasPreavis) {
            form.change("preavis_salaires", []);
          } else {
            form.batch(() => {
              const { values } = form.getState();
              form.change("preavis_salaires", getSalairesPeriods());
              form.change("salary", null);
            });
          }
        }}
      />
      <Field<boolean> name="hasPreavis">{({ input }) => <AskSalaires />}</Field>
    </>
  );
};

export default SalaireWithPreavis;
