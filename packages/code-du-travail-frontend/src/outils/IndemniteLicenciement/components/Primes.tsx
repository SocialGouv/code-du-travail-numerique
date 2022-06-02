import { icons, Input, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { AddButton, DelButton } from "../../common/Buttons";
import { InlineError } from "../../common/ErrorField";
import { isNumber } from "../../common/validators";

type Prime = (number | undefined) | null;

type Props = {
  visible?: boolean;
  onChange: (primes: Prime[]) => void;
  primes: Prime[];
};

export default function Primes({ primes, visible = true, onChange }: Props) {
  const [localPrimes, setLocalPrimes] = React.useState<Prime[]>(
    primes ?? [undefined]
  );
  const [errorsPrimes, setErrorsPrimes] = React.useState({});

  const onAddButtonClick = () => {
    setLocalPrimes([...localPrimes, undefined]);
  };

  const onDeleteButtonClick = (index: number) => {
    setLocalPrimes(primes.filter((_, i) => i !== index));
  };

  const onChangePrimes = (index: number, value: string) => {
    const prime = parseFloat(value);
    if (!isNumber(prime)) {
      setErrorsPrimes({
        ...errorsPrimes,
        [`${index}`]: "Veuillez entrer un nombre",
      });
      return;
    }
    const newLocalPrimes = localPrimes.map((p, i) => (i === index ? prime : p));
    setLocalPrimes(newLocalPrimes);
    onChange(newLocalPrimes);
  };

  return (
    <>
      {visible && (
        <p>
          Primes annuelles ou exceptionnelles perçues au cours des 3 derniers
          mois
        </p>
      )}
      {localPrimes.map((value, index) => (
        <Row key={index}>
          <div>
            <Input
              name={`${index}.prime`}
              type="number"
              invalid={errorsPrimes[`${index}`]}
              icon={icons.Euro}
              onChange={(e) => onChangePrimes(index, e.target.value)}
              value={value}
            />
            {errorsPrimes[`${index}`] && (
              <InlineError>{errorsPrimes[`${index}`]}</InlineError>
            )}
          </div>
          <StyledDelButton onClick={onDeleteButtonClick}>
            Supprimer
          </StyledDelButton>
        </Row>
      ))}
      {visible && (
        <AddButton onClick={onAddButtonClick}>Ajouter une prime</AddButton>
      )}
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
