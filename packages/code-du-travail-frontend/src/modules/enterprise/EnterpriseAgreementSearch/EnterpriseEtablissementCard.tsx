"use client";
import { fr } from "@codegouvfr/react-dsfr";
import { EnterpriseCard } from "./EnterpriseCard";
import { MatchingEtablissement } from "../types";
import Link from "../../common/Link";

type Props = {
  etablissement: MatchingEtablissement;
  linkProps: {
    href?: string;
    target?: string;
    onClick?: (event: React.MouseEvent) => void;
  };
};

export const EnterpriseEtablissementCard = ({
  etablissement,
  linkProps,
}: Props) => (
  <Link href={linkProps}>
    {etablissement.address} - SIRET: {etablissement.siret}
  </Link>
);
