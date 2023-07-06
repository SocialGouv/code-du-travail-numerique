import { PreavisRetraiteFormState } from "../../form";

import { PreavisRetraiteState, PreavisRetraiteStore } from "../types";
import { initialState } from "../preavisRetraiteStore";
import {
  Publicodes,
  PublicodesConvertedUnit,
  PublicodesData,
  PublicodesPreavisRetraiteResult,
} from "@socialgouv/modeles-social/bin";
import { PreavisRetraitePublicodes } from "@socialgouv/modeles-social";

export const generateStore = (
  publicodes: PreavisRetraitePublicodes,
  state: PreavisRetraiteState = initialState,
  onAgreementChange = () => {},
  onFormValuesChange = () => {},
  onInformationChange = () => {},
  onOriginChange = () => {},
  onSeniorityChange = () => {},
  onStepChange = () => {}
): PreavisRetraiteStore => ({
  ...state,
  onAgreementChange,
  onFormValuesChange,
  onInformationChange,
  onOriginChange,
  onSeniorityChange,
  onStepChange,
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

class PublicodesStub extends PreavisRetraitePublicodes {
  public data;

  constructor(data: PublicodesData<PublicodesPreavisRetraiteResult>) {
    super(data);
    this.data = data;
  }

  execute: (rule: string) => PublicodesPreavisRetraiteResult = () =>
    publicodesData.result;
  setSituation: (
    args: Record<string, any>
  ) => PublicodesData<PublicodesPreavisRetraiteResult> = () => this.data;
  getNotifications: () => [];
  getNotificationsBloquantes: () => [];
  getReferences: () => [];
}

export const publicodesStub = (
  data: PublicodesData<PublicodesPreavisRetraiteResult> = publicodesData
) => new PublicodesStub(data);

export const formValuesDummy: PreavisRetraiteFormState = {};
