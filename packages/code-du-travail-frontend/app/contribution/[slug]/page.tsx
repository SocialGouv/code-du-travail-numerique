import React from "react";
import { DsfrLayout } from "../../../src/modules/layout";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import {
  ContributionLayout,
  fetchAgreementDeclinations,
  fetchContributionBySlug,
  fetchContributionExploreThemes,
  fetchGenericContributionInfos,
} from "../../../src/modules/contributions";
import { removeCCNumberFromSlug } from "../../../src/modules/utils/removeCCNumberFromSlug";

export async function generateMetadata(props) {
  const params = await props.params;
  const { metas } = await getContribution(params.slug);

  return generateDefaultMetadata({
    title: metas.title,
    description: metas.description,
    path: `/contribution/${params.slug}`,
  });
}

async function Contribution(props) {
  const params = await props.params;
  const contribution = await getContribution(params.slug);
  // Le mapping éditorial des sous-thèmes (#7455) est indexé sur le slug
  // générique : la page CC `1486-mon-slug` partage l'entrée de `mon-slug`.
  const genericSlug = contribution.isGeneric
    ? params.slug
    : removeCCNumberFromSlug(params.slug);
  // Fetchs indépendants une fois la contribution connue.
  const [genericInfos, agreementDeclinations, exploreThemes] =
    await Promise.all([
      // Page personnalisée à une CC : les infos du document générique frère
      // alimentent le bloc de sélection de CC (réinitialisation à l'arrivée
      // externe), le document conventionnel ne portant pas
      // ccSupported/ccUnextended.
      contribution.isGeneric
        ? undefined
        : fetchGenericContributionInfos(genericSlug),
      // Maillage interne (#7355) : seule la fiche générique liste ses
      // déclinaisons par convention collective ; les pages CC renvoient déjà
      // vers la générique.
      contribution.isGeneric ? fetchAgreementDeclinations(contribution) : [],
      fetchContributionExploreThemes(genericSlug),
    ]);
  return (
    <DsfrLayout>
      <ContributionLayout
        contribution={contribution}
        genericInfos={genericInfos}
        agreementDeclinations={agreementDeclinations}
        exploreThemes={exploreThemes}
      />
    </DsfrLayout>
  );
}

const getContribution = async (slug: string) => {
  const contribution = await fetchContributionBySlug(slug);

  if (!contribution) {
    return notFound();
  }
  return contribution;
};

export default Contribution;
