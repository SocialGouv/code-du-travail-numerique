import React from "react";
import { DsfrLayout } from "../../../../src/modules/layout";
import { notFound, permanentRedirect } from "next/navigation";
import {
  generateDefaultMetadata,
  getContentArticle,
} from "../../../../src/modules/common/metas";
import {
  ContributionLayout,
  fetchContributionBySlug,
  fetchContributionExploreThemes,
  fetchGenericContributionInfos,
} from "../../../../src/modules/contributions";
import { hasAgreementSubpath } from "../../../../src/modules/contributions/contributionUtils";

export async function generateMetadata(props) {
  const params = await props.params;
  redirectToLegacyPathIfNeeded(params.slug, params.idcc);
  const contribution = await fetchContribution(params.slug, params.idcc);

  return generateDefaultMetadata({
    title: contribution.metas.title,
    description: contribution.metas.description,
    path: `/contribution/${params.slug}/${params.idcc}`,
    article: getContentArticle(contribution.date, contribution.breadcrumbs),
  });
}

async function ContributionByAgreement(props) {
  const params = await props.params;
  redirectToLegacyPathIfNeeded(params.slug, params.idcc);
  // Infos du document générique frère (cf. page /contribution/[slug]) : ici le
  // slug générique est directement le segment de route — il sert aussi de clé
  // au mapping des sous-thèmes mis en avant (#7455).
  const [contribution, genericInfos, exploreThemes] = await Promise.all([
    fetchContribution(params.slug, params.idcc),
    fetchGenericContributionInfos(params.slug),
    fetchContributionExploreThemes(params.slug),
  ]);

  if (/^\d+$/.test(params.idcc) && contribution.ccnSlug) {
    permanentRedirect(`/contribution/${params.slug}/${contribution.ccnSlug}`);
  }

  return (
    <DsfrLayout>
      <ContributionLayout
        contribution={contribution}
        genericInfos={genericInfos}
        exploreThemes={exploreThemes}
      />
    </DsfrLayout>
  );
}

// Le format `/contribution/<slug>/<cc>` est réservé aux contributions de
// `CONTRIBUTIONS_WITH_AGREEMENT_SUBPATH` (généralisation suspendue, #7518). Pour
// les autres, la route servait un doublon indexable de la page historique
// `/contribution/<idcc>-<slug>` : on y renvoie en un seul saut.
const redirectToLegacyPathIfNeeded = (slug: string, idccOrCcnSlug: string) => {
  if (hasAgreementSubpath(slug)) return;
  const idcc = idccOrCcnSlug.split("-")[0];
  if (!/^\d+$/.test(idcc)) notFound();
  permanentRedirect(`/contribution/${idcc}-${slug}`);
};

const fetchContribution = async (slug: string, idccOrCcnSlug: string) => {
  const idcc = idccOrCcnSlug.split("-")[0];
  const contribution = await fetchContributionBySlug(`${idcc}-${slug}`);

  if (!contribution) {
    return notFound();
  }
  return contribution;
};

export default ContributionByAgreement;
