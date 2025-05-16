import {
  Breadcrumb,
  EditorialContentBaseContentPart,
} from "@socialgouv/cdtn-types";
import { fr } from "@codegouvfr/react-dsfr";
import { AccordionWithAnchor } from "../common/AccordionWithAnchor";
import { ContentPart, References } from "./content";
import React from "react";
import { RelatedItem } from "../documents";
import {
  EditoralContentReferenceBloc,
  GraphicContentPart,
} from "@socialgouv/cdtn-types/build/hasura/editorial-content";
import { QuestionnaireWrapper } from "./questionnaire";
import { ContainerInformation } from "../layout/ContainerInformation";
import { KeysToCamelCase } from "./type";
import DisplayContent from "../common/DisplayContent";

type Props = {
  date: string;
  title: string;
  breadcrumbs: Breadcrumb[];
  description: string;
  intro: string;
  relatedItems: { items: RelatedItem[]; title: string }[];
  contents: EditorialContentBaseContentPart[];
  references?: EditoralContentReferenceBloc[];
  slug: string;
  infography?: KeysToCamelCase<GraphicContentPart>;
  dismissalProcess?: boolean;
};

export const Information = ({
  date,
  title,
  breadcrumbs,
  description,
  intro,
  contents,
  relatedItems,
  references,
  slug,
  dismissalProcess,
  infography,
}: Props) => {
  return (
    <ContainerInformation
      currentPage={title}
      breadcrumbs={breadcrumbs}
      relatedItems={relatedItems}
      title={title}
      description={description}
      infography={infography}
      dismissalProcess={dismissalProcess}
      header={
        <>
          <h1>{title}</h1>
          <p className={fr.cx("fr-my-6w")}>Mis à jour le&nbsp;: {date}</p>

          {dismissalProcess && (
            <QuestionnaireWrapper
              name="dismissalProcess"
              slug={slug}
              title="Quelle est votre situation ?"
              className={fr.cx("fr-mb-6w")}
            ></QuestionnaireWrapper>
          )}
        </>
      }
    >
      <div className={fr.cx("fr-mb-6w")}>
        {intro && <DisplayContent content={intro} titleLevel={2} />}
        {contents.length === 1 ? (
          <>
            <h2>{contents[0].title}</h2>
            <ContentPart parts={contents[0].blocks} />
            {contents[0].references?.map((item) => (
              <References
                key={item.label}
                label={item.label}
                links={item.links}
              />
            ))}
          </>
        ) : (
          <AccordionWithAnchor
            items={contents.map((item) => ({
              id: item.name,
              title: item.title,
              content: (
                <>
                  <ContentPart parts={item.blocks} />
                  {item.references?.map((item) => (
                    <References
                      key={item.label}
                      label={item.label}
                      links={item.links}
                    />
                  ))}
                </>
              ),
            }))}
            titleAs={`h2`}
          />
        )}

        {references?.map((item) => (
          <References key={item.label} label={item.label} links={item.links} />
        ))}
      </div>
    </ContainerInformation>
  );
};
