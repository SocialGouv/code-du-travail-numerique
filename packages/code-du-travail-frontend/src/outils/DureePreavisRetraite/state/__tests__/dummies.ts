import { PreavisRetraiteFormState } from "../../types";

import { PreavisRetraiteState, PreavisRetraiteStore } from "../types";
import { initialState } from "../preavisRetraiteStore";
import {
  Publicodes,
  PublicodesConvertedUnit,
  PublicodesData,
  PublicodesPreavisRetraiteResult,
} from "@socialgouv/modeles-social/bin";

export const generateStore = (
  publicodes: Publicodes<PublicodesPreavisRetraiteResult>,
  state: PreavisRetraiteState = initialState,
  onAgreementChange = () => {},
  onFormValuesChange = () => {},
  onInformationChange = () => {},
  onOriginChange = () => {}
): PreavisRetraiteStore => ({
  ...state,
  onAgreementChange,
  onFormValuesChange,
  onInformationChange,
  onOriginChange,
  publicodes,
});

export const publicodesData: PublicodesData<PublicodesPreavisRetraiteResult> = {
  missingArgs: [],
  result: {
    unit: PublicodesConvertedUnit.MONTH,
    value: 1,
    valueInDays: 30,
  },
  situation: [],
};

class PublicodesDummy implements Publicodes<PublicodesPreavisRetraiteResult> {
  constructor() {}

  data = publicodesData;
  execute: (rule: string) => PublicodesPreavisRetraiteResult = () =>
    publicodesData.result;
  setSituation: (
    args: Record<string, any>
  ) => PublicodesData<PublicodesPreavisRetraiteResult> = () => publicodesData;
}

export const dummyPublicodes = new PublicodesDummy();

export const formValuesDummy: PreavisRetraiteFormState = {};
