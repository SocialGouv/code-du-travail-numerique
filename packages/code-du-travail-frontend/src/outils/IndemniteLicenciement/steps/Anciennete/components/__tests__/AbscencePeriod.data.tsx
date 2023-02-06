import React from "react";
import { Motif, MotifKeys } from "@socialgouv/modeles-social";

export const motif1: Motif = {
  label: "Motif 1",
  key: MotifKeys.accidentTrajet,
  value: 1,
};

export const motif2: Motif = {
  label: "Motif 2",
  key: MotifKeys.greve,
  value: 0.5,
};

export const motif2WithDate: Motif = {
  label: "Motif 2",
  key: MotifKeys.greve,
  value: 0.5,
  startAt: () => true,
};

export const sampleMotifs: Motif[] = [motif1, motif2];

export const sampleMotifsWithStartedDate: Motif[] = [motif1, motif2WithDate];
