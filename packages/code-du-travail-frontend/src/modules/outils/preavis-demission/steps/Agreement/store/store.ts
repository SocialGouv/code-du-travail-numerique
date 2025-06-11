import produce from "immer";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import {
  Agreement,
  AgreementRoute,
} from "src/modules/outils/indemnite-depart/types";
import { Enterprise } from "src/modules/enterprise";
import { StoreSliceWrapperPreavisDemission } from "../../store";
import {
  AgreementStoreData,
  AgreementStoreSlice,
  AgreementSearchValue,
} from "./types";
import { loadPublicodes } from "src/modules/outils/common/publicodes";
import { InformationsStoreSlice } from "../../Informations/store";

const initialState: Omit<AgreementStoreData, "publicodes"> = {
  input: {
    hasNoEnterpriseSelected: false,
    informationError: false,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

const createAgreementStore: StoreSliceWrapperPreavisDemission<
  AgreementStoreSlice,
  InformationsStoreSlice
> = (set, get) => ({
  agreementData: {
    ...initialState,
    publicodes: loadPublicodes<PublicodesSimulator.PREAVIS_DEMISSION>(
      PublicodesSimulator.PREAVIS_DEMISSION
    ),
  },
  agreementFunction: {
    onRouteChange: (value: AgreementRoute) => {
      set(
        produce((state: AgreementStoreSlice) => {
          state.agreementData.input.route = value;
          state.agreementData.input.agreement = undefined;
          state.agreementData.input.enterprise = undefined;
          state.agreementData.error.agreement = undefined;
          state.agreementData.error.enterprise = undefined;
          state.agreementData.isStepValid = false;
        })
      );

      // Plus besoin de gérer "not-selected" car cette option n'est plus disponible
    },
    onInitAgreementPage: () => {
      set(
        produce((state: AgreementStoreSlice) => {
          state.agreementData.input.route = "agreement";
        })
      );
    },
    onAgreementChange: (
      agreement: Agreement | undefined,
      enterprise?: Enterprise
    ) => {
      set(
        produce((state: AgreementStoreSlice) => {
          state.agreementData.input.agreement = agreement;
          state.agreementData.input.enterprise = enterprise;
          state.agreementData.error.agreement = undefined;
          state.agreementData.error.enterprise = undefined;
          state.agreementData.isStepValid = !!agreement;
        })
      );

      // Recharger l'instance publicodes avec la nouvelle convention collective
      const idcc = agreement?.num?.toString();
      if (idcc) {
        set(
          produce((state: AgreementStoreSlice) => {
            state.agreementData.publicodes =
              loadPublicodes<PublicodesSimulator.PREAVIS_DEMISSION>(
                PublicodesSimulator.PREAVIS_DEMISSION,
                idcc
              );
          })
        );
      } else {
        set(
          produce((state: AgreementStoreSlice) => {
            state.agreementData.publicodes =
              loadPublicodes<PublicodesSimulator.PREAVIS_DEMISSION>(
                PublicodesSimulator.PREAVIS_DEMISSION
              );
          })
        );
      }
      get().informationsFunction.resetQuestions();
      get().informationsFunction.generatePublicodesQuestions();
    },
    onNextStep: (): ValidationResponse => {
      const { agreement } = get().agreementData.input;

      set(
        produce((state: AgreementStoreSlice) => {
          state.agreementData.hasBeenSubmit = true;
          if (!agreement) {
            state.agreementData.error.agreement =
              "Vous devez sélectionner une convention collective";
            state.agreementData.isStepValid = false;
          } else {
            state.agreementData.error.agreement = undefined;
            state.agreementData.isStepValid = true;
          }
        })
      );

      return agreement ? ValidationResponse.Valid : ValidationResponse.NotValid;
    },
    onEnterpriseSearch: (value: AgreementSearchValue) => {
      set(
        produce((state: AgreementStoreSlice) => {
          state.agreementData.input.route = "enterprise";
        })
      );
    },
    onAgreementSearch: (value: AgreementSearchValue) => {
      set(
        produce((state: AgreementStoreSlice) => {
          state.agreementData.input.route = "agreement";
        })
      );
    },
    setHasNoEnterpriseSelected: (value: boolean) => {
      set(
        produce((state: AgreementStoreSlice) => {
          state.agreementData.input.hasNoEnterpriseSelected = value;
        })
      );
    },
  },
});

export default createAgreementStore;
