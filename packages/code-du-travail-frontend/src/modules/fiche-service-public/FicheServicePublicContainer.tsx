import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { RelatedItem } from "../documents";
import { ElasticFicheServicePublic } from "./queries";
import { ContainerRichWithBreadcrumbs } from "../layout/ContainerRichWithBreadcrumbs";
import { SourceData } from "../layout/SourceData";
import "../../../public/static/fiches-mt.css";
import References from "../../common/References";
import {FicheServicePublic} from "../../fiche-service-public";
import {ElementBuilder} from "../../fiche-service-public/components/ElementBuilder";
import {ReferenceList} from "../common/ReferencesList";

type Props = {
  relatedItems: { items: RelatedItem[]; title: string }[];
  raw: any;
} & Pick<
    ElasticFicheServicePublic,
    "title" | "date" | "metaDescription" | "url" | "breadcrumbs" | "referencedTexts"
>;;

export function FicheServicePublicContainer({
  metaDescription,
  date,
  relatedItems,
  url,
  title,
  raw,
  breadcrumbs,
  referencedTexts,
}: Props) {
  return (
    <ContainerRichWithBreadcrumbs
      currentPage={title}
      breacrumbs={breadcrumbs}
      relatedItems={relatedItems}
      title={title}
      description={metaDescription}
    >
      <h1 className={fr.cx("fr-mb-6w")}>{title}</h1>

      <SourceData
        source={{ url, name: "Fiche service-public.fr" }}
        updatedAt={date}
      />

      <div className={fr.cx("fr-mb-5w")}>
        {
          // Without the check, the prop children of the Answer will evaluate to true
          // even if in the end, <FicheServicePublic /> returns null
          raw && <ElementBuilder data={raw.children} />
        }
        <div className={fr.cx("fr-callout", "fr-p-4w")}>
          <h2 className={fr.cx("fr-h5", "fr-pb-1w")}>
            Références juridiques concernées :
          </h2>
          <ReferenceList references={referencedTexts}/>

        </div>


      </div>
    </ContainerRichWithBreadcrumbs>
  );
}
