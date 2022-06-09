import { icons, Input, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { AddButton, DelButton } from "../../common/Buttons";
import { InlineError } from "../../common/ErrorField";
import { ErrorWrapper } from "../../Components/TextQuestion";

export type Prime = number | undefined;

type Props = {
  onChange: (primes: Prime[]) => void;
  primes: Prime[];
};

export default function Primes({ primes, onChange }: Props) {
  const [localPrimes, setLocalPrimes] = React.useState<Prime[]>(primes);
  const [errorsPrimes, setErrorsPrimes] = React.useState({});

  const onAddButtonClick = () => {
    const newLocalPrimes = [...localPrimes, undefined];
    setLocalPrimes(newLocalPrimes);
    onChange(newLocalPrimes);
  };

  const onDeleteButtonClick = (index: number) => {
    const newLocalPrimes = localPrimes.filter((_, i) => i !== index);
    setLocalPrimes(newLocalPrimes);
    onChange(newLocalPrimes);
  };

  const onChangePrimes = (index: number, value: string) => {
    const prime = parseFloat(value);
    console.log(prime);
    if (isNaN(prime)) {
      setErrorsPrimes({
        ...errorsPrimes,
        [`${index}`]: "Veuillez entrer un nombre",
      });
      return;
    } else {
      setErrorsPrimes({
        ...errorsPrimes,
        [`${index}`]: undefined,
      });
    }
    const newLocalPrimes = localPrimes.map((p, i) => (i === index ? prime : p));
    setLocalPrimes(newLocalPrimes);
    onChange(newLocalPrimes);
  };

  return (
    <>
      <p>
        Primes annuelles ou exceptionnelles perçues au cours des 3 derniers mois
      </p>
      {localPrimes.map((value, index) => (
        <Row key={index}>
          <div>
            <Input
              id={`prime-${index}`}
              name={`${index}.prime`}
              type="number"
              invalid={errorsPrimes[`${index}`]}
              icon={icons.Euro}
              onChange={(e) => onChangePrimes(index, e.target.value)}
              value={value}
              updateOnScrollDisabled
            />
            {errorsPrimes[`${index}`] && (
              <ErrorWrapper>
                <InlineError>{errorsPrimes[`${index}`]}</InlineError>
              </ErrorWrapper>
            )}
          </div>
          <StyledDelButton onClick={() => onDeleteButtonClick(index)}>
            Supprimer
          </StyledDelButton>
        </Row>
      ))}
      <AddButton onClick={onAddButtonClick}>Ajouter une prime</AddButton>
    </>
  );
}

const { spacings } = theme;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${spacings.tiny};
`;

const StyledDelButton = styled(DelButton)`
  margin-left: ${spacings.base};
`;
