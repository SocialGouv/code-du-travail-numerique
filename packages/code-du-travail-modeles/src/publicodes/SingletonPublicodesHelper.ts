import {
  indemniteLicenciementModeles,
  indemnitePrecariteModeles,
  preavisRetraiteModeles,
  ruptureConventionnelleModeles,
  preavisDemissionModeles,
  preavisLicenciementModeles,
  heuresRechercheEmploiModeles,
} from "..";
import type { PublicodesInstance } from ".";
import {
  HeuresRechercheEmploiPublicodes,
  IndemniteLicenciementPublicodes,
  IndemnitePrecaritePublicodes,
  PreavisDemissionPublicodes,
  PreavisLicenciementPublicodes,
  PreavisRetraitePublicodes,
  PublicodesSimulator,
  RuptureConventionnellePublicodes,
} from ".";

class SingletonPublicodesHelper<T extends PublicodesSimulator> {
  private static readonly instances: SingletonPublicodesHelper<PublicodesSimulator>[] =
    [];

  private readonly publicodesInstances: PublicodesInstance<T>;

  private readonly simulator: T;

  private readonly idcc?: string;

  private constructor(simulator: T, idcc?: string) {
    this.simulator = simulator;
    this.idcc = idcc;
    this.publicodesInstances = this.createPublicodesInstance(
      simulator,
      idcc
    ) as PublicodesInstance<T>;
  }

  public static getInstance<T extends PublicodesSimulator>(
    simulator: PublicodesSimulator,
    idcc?: string
  ): PublicodesInstance<T> {
    const existingInstance = SingletonPublicodesHelper.instances.find(
      (instance) => instance.simulator === simulator && instance.idcc === idcc
    );

    if (existingInstance) {
      return existingInstance.publicodesInstances as PublicodesInstance<T>;
    }

    const newInstance = new SingletonPublicodesHelper(simulator, idcc);
    SingletonPublicodesHelper.instances.push(newInstance);

    return newInstance.publicodesInstances as PublicodesInstance<T>;
  }

  private readonly createPublicodesInstance = (
    simulator: PublicodesSimulator,
    idcc?: string
  ) => {
    const rules = this.loadPublicodesRules(simulator);
    switch (simulator) {
      case PublicodesSimulator.PREAVIS_RETRAITE:
        return new PreavisRetraitePublicodes(rules);
      case PublicodesSimulator.INDEMNITE_LICENCIEMENT:
        return new IndemniteLicenciementPublicodes(rules, idcc);
      case PublicodesSimulator.RUPTURE_CONVENTIONNELLE:
        return new RuptureConventionnellePublicodes(rules, idcc);
      case PublicodesSimulator.PREAVIS_DEMISSION:
        return new PreavisDemissionPublicodes(rules, idcc);
      case PublicodesSimulator.INDEMNITE_PRECARITE:
        return new IndemnitePrecaritePublicodes(rules, idcc);
      case PublicodesSimulator.PREAVIS_LICENCIEMENT:
        return new PreavisLicenciementPublicodes(rules, idcc);
      case PublicodesSimulator.HEURES_RECHERCHE_EMPLOI:
        return new HeuresRechercheEmploiPublicodes(rules, idcc);
      default:
        throw new Error("Simulator not supported");
    }
  };

  private readonly loadPublicodesRules = (
    simulator: PublicodesSimulator
  ): any => {
    switch (simulator) {
      case PublicodesSimulator.PREAVIS_RETRAITE:
        return preavisRetraiteModeles;
      case PublicodesSimulator.INDEMNITE_LICENCIEMENT:
        return indemniteLicenciementModeles;
      case PublicodesSimulator.RUPTURE_CONVENTIONNELLE:
        return ruptureConventionnelleModeles;
      case PublicodesSimulator.PREAVIS_DEMISSION:
        return preavisDemissionModeles;
      case PublicodesSimulator.INDEMNITE_PRECARITE:
        return indemnitePrecariteModeles;
      case PublicodesSimulator.PREAVIS_LICENCIEMENT:
        return preavisLicenciementModeles;
      case PublicodesSimulator.HEURES_RECHERCHE_EMPLOI:
        return heuresRechercheEmploiModeles;
      default:
        throw new Error("Simulator not supported");
    }
  };
}

export default SingletonPublicodesHelper;
