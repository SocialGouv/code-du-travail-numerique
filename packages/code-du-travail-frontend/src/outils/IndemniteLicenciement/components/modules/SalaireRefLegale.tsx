import { icons, Input } from "@socialgouv/cdtn-ui";
import { YesNoQuestion } from "../../../common/YesNoQuestion";
import { Field } from "react-final-form";
import { isNumber } from "../../../common/validators";
import { Question } from "../../../common/Question";
import { SmallText } from "../../../common/stepStyles";
import { Error } from "../../../common/ErrorField";
import { SalaireTempsPlein } from "../SalaireTempsPlein";
import { IndemniteLicenciementFormContent } from "../../../common/type/WizardType";
import { parse } from "../../../common/utils";
import { MOTIFS } from "../AbsencePeriods";
import { differenceInMonths, format, subMonths } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { FormApi } from "final-form";

const getSalairesPeriods = ({
  dateEntree,
  dateNotification,
  absencePeriods,
}: IndemniteLicenciementFormContent): {
  label: string;
  salary: number | null;
}[] => {
  if (!dateEntree || !dateNotification) {
    return [];
  }
  const dEntree = parse(dateEntree);
  const dNotification = parse(dateNotification);

  const totalAbsence = (absencePeriods || [])
    .filter((period) => Boolean(period.duration))
    .reduce((total, item) => {
      const motif = MOTIFS.find((motif) => motif.label === item.type);
      return total + item.duration * (motif?.value ?? 0);
    }, 0);

  const nbMonthes = Math.min(
    differenceInMonths(dNotification, dEntree) - totalAbsence,
    12
  );
  return Array.from({ length: nbMonthes }).map((_, index) => {
    return {
      label: format(subMonths(dNotification, index + 1), "MMMM yyyy", {
        locale: frLocale,
      }),
      salary: null,
    };
  });
};

const SalaireRefLegale = ({
  form,
}: {
  form: FormApi<IndemniteLicenciementFormContent>;
}): JSX.Element => {
  return (
    <>
      <YesNoQuestion
        name="hasSameSalaire"
        label="Le salaire mensuel brut a-t-il été le même durant les 12 derniers mois précédant la notification du licenciement&nbsp;?"
        onChange={(hasSameSalaire) => {
          if (hasSameSalaire) {
            form.change("salaires", []);
          } else {
            form.batch(() => {
              const { values } = form.getState();
              form.change("salaires", getSalairesPeriods(values));
              form.change("salaire", null);
            });
          }
        }}
      />
      <Field name="hasSameSalaire">
        {({ input }) => (
          <>
            {input.value && (
              <Field
                name="salaire"
                validate={isNumber}
                subscription={{
                  error: true,
                  invalid: true,
                  touched: true,
                  value: true,
                }}
              >
                {({ input, meta: { touched, error, invalid } }) => (
                  <>
                    <Question required htmlFor="salaire">
                      Quel a été le montant du salaire mensuel brut&nbsp;?
                    </Question>
                    <SmallText>
                      Prendre en compte les primes et avantages en nature.
                    </SmallText>
                    <Input
                      {...input}
                      type="number"
                      invalid={touched && invalid}
                      icon={icons.Euro}
                    />
                    {error && touched && invalid && <Error>{error}</Error>}
                  </>
                )}
              </Field>
            )}
            <SalaireTempsPlein name="salaires" />
          </>
        )}
      </Field>
    </>
  );
};

export default SalaireRefLegale;
