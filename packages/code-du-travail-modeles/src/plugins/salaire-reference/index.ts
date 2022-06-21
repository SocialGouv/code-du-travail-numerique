import { ReferenceSalary1596 } from "./1596_batiment_ouvriers_employes";
import { ReferenceSalaryLegal } from "./legal";
import type { IReferenceSalary } from "./types";
import { SupportedCcIndemniteLicenciement } from "./types";
import { ReferenceSalaryV } from "./v";

export class ReferenceSalaryFactory {
  create<T extends SupportedCcIndemniteLicenciement>(
    idcc: T
  ): IReferenceSalary<T> {
    switch (idcc) {
      case SupportedCcIndemniteLicenciement.IDCC1596:
        return new ReferenceSalary1596() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCCV:
        return new ReferenceSalaryV() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new ReferenceSalaryLegal() as IReferenceSalary<T>;
    }
  }
}

//TODO: remove uncomment
// const sr = new ReferenceSalaryFactory();

// const res1 = sr.create(SupportedCcIndemniteLicenciement.IDCC1596);

// const res2 = sr.create(SupportedCcIndemniteLicenciement.IDCCV);

// res1.computeReferenceSalary({
//   hasSameSalaire: true,
//   primes: [],
//   salaire: 0,
//   salaires: [],
// });
// res2.computeReferenceSalary({ sisi: true });

export * from "./types";
