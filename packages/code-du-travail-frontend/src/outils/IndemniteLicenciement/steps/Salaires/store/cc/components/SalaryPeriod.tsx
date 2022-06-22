import React from "react";

export type Prime = number | null;

type Props = {
  onChange: (primes: Prime[]) => void;
  primes: Prime[];
  error?: string;
};

export default function Primes({ primes, onChange, error }: Props) {
  const [localPrimes, setLocalPrimes] = React.useState<Prime[]>(
    primes.length === 0 ? [null] : primes
  );
  const [errorsPrimes, setErrorsPrimes] = React.useState({});

  const onAddButtonClick = () => {
    const newLocalPrimes = [...localPrimes, null];
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
    if (isNaN(prime) && value.length > 0) {
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
      <Primes />
    </>
  );
}
