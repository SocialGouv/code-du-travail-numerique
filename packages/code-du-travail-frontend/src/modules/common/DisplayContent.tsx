import parse, {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
  Text,
} from "html-react-parser";
import React, { ElementType, JSX } from "react";
import { AccordionWithAnchor } from "./AccordionWithAnchor";
import { v4 as generateUUID } from "uuid";
import { fr } from "@codegouvfr/react-dsfr";
import Link from "./Link";
import { slugify } from "@socialgouv/cdtn-utils";
import { captureException } from "@sentry/nextjs";
import { formatFileSize, toUrl } from "../utils";
import { xssWrapper } from "../utils/xss";
import { AccessibleAlert } from "../outils/common/components/AccessibleAlert";
import { css } from "@styled-system/css";
import Image from "next/image";
import { ContributionInfographicFull } from "@socialgouv/cdtn-types/build/elastic/contributions";
import { Qahiri } from "next/dist/compiled/@next/font/dist/google";

export type numberLevel = 2 | 3 | 4 | 5 | 6;

const mapItem = (params: Options, domNode: Element, summary: Element) => ({
  content: renderChildren(
    domNode,
    true,
    options({ ...params, titleLevel: (params.titleLevel + 1) as numberLevel })
  ),
  title: domToReact(summary.children as DOMNode[], {
    transform: (reactNode, domNode) => {
      // @ts-ignore
      if (domNode.children) {
        // @ts-ignore
        return domNode.children[0].data;
      }
      // @ts-ignore
      return domNode.data;
    },
    trim: true,
  }),
});
const mapToAccordion = (titleLevel: numberLevel, isParent: boolean, items) => {
  const props = titleLevel <= 6 ? { titleLevel } : {};

  return (
    <div className={fr.cx("fr-my-3w")}>
      <AccordionWithAnchor
        {...props}
        data-testid="contrib-accordion"
        items={items.map((item) => ({
          ...item,
          ...(isParent
            ? { id: slugify(item.title) }
            : { id: slugify(item.title) + "_" + generateUUID() }),
        }))}
        titleAs={`h${titleLevel}`}
      />
    </div>
  );
};

function getFirstElementChild(domNode: Element) {
  let child = domNode.children.shift();
  while (child && child.type !== "tag") {
    child = domNode.children.shift();
  }
  return child;
}

function getNextFirstElement(domNode: Element) {
  let next = domNode.next;
  while (next && next.type !== "tag") {
    next = next.next;
  }
  return next;
}

function hasDetailsParent(domNode: Element) {
  let parent = domNode.parent;
  while (parent) {
    if (parent.type === "tag" && parent.name === "details") {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}

const theadMaxRowspan = (tr: Element) => {
  const rowspans = tr.children.map((child) => {
    if (child.type === "tag" && child.name === "td") {
      return parseInt(child.attribs["rowspan"] ?? -1);
    } else {
      return -1;
    }
  });
  const maxRowspan = rowspans.reduce(
    (previousValue, currentValue) =>
      currentValue > previousValue ? currentValue : previousValue,
    0
  );
  return maxRowspan === -1 ? 1 : maxRowspan;
};

const getData = (el?: ChildNode) => {
  if (!el) return "";
  if (el instanceof Text) {
    return el.data;
  } else {
    let str = "";
    el.childNodes.forEach((node) => {
      str += getData(node);
    });
    return str;
  }
};

const mapTbody = (tbody: Element) => {
  let theadChildren: Element[] = [];
  const firstLine = getFirstElementChild(tbody);

  if (firstLine) {
    let maxRowspan = theadMaxRowspan(firstLine);
    theadChildren.push(firstLine);
    for (let i = 1; i < maxRowspan; i++) {
      let child = getFirstElementChild(tbody);
      if (child) {
        theadChildren.push(child);
      }
    }
  }

  return (
    <div className={fr.cx("fr-table", "fr-mb-2w")}>
      <div className={fr.cx("fr-table__wrapper")}>
        <div className={fr.cx("fr-table__container")}>
          <div className={fr.cx("fr-table__content")}>
            <table>
              {theadChildren.length > 0 && (
                <>
                  {theadChildren[0].children[0] && (
                    <caption className={fr.cx("fr-hidden")}>
                      {getData(theadChildren[0].childNodes[0] as any)}
                    </caption>
                  )}
                  <thead>
                    {theadChildren.map((child, rowIndex) => {
                      return (
                        <tr key={`tr-${rowIndex}`}>
                          {domToReact(
                            child.children.map((c) => {
                              if (c instanceof Element && c.attribs) {
                                return {
                                  ...c,
                                  name: "th",
                                  attribs: {
                                    ...c.attribs,
                                    scope: "col",
                                  },
                                };
                              } else {
                                return {
                                  ...c,
                                  name: "th",
                                };
                              }
                            }) as DOMNode[],
                            {
                              trim: true,
                            }
                          )}
                        </tr>
                      );
                    })}
                  </thead>
                </>
              )}
              <tbody>{renderChildren(tbody, false)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

function getItem(domNode: Element, params: Options) {
  const summary = getFirstElementChild(domNode);
  if (summary && summary.name === "summary") {
    return mapItem(params, domNode, summary);
  }
}

function renderChildren(
  domNode,
  trim: boolean,
  option?: HTMLReactParserOptions
) {
  return domToReact(domNode.children as DOMNode[], {
    ...option,
    trim,
  });
}

function render(domNode, trim: boolean, option: HTMLReactParserOptions) {
  return domToReact(domNode, {
    ...option,
    trim,
  });
}

const getHeadingElement = (params: Options, domNode) => {
  const titleLevel = params.titleLevel;
  const Tag = ("h" + titleLevel) as ElementType;
  return titleLevel <= 6 ? (
    <Tag className={fr.cx("fr-mt-2w")}>
      {renderChildren(domNode, false, options(params))}
    </Tag>
  ) : (
    <strong className={fr.cx("fr-mt-2w")}>
      {renderChildren(domNode, false, options(params))}
    </strong>
  );
};

type Options = {
  titleLevel: numberLevel;
  infographics: ContributionInfographicFull[];
};
const options = (params: Options): HTMLReactParserOptions => {
  const { titleLevel } = params;
  let accordionTitleLevel = titleLevel;
  let headingTitleLevel = titleLevel;

  return {
    replace(domNode) {
      if (domNode instanceof Element) {
        if (domNode.name === "span" && domNode.attribs.class === "title") {
          accordionTitleLevel = titleLevel + 1;
          headingTitleLevel = titleLevel + 1;
          return getHeadingElement(params, domNode);
        }
        if (domNode.name === "span" && domNode.attribs.class === "sub-title") {
          accordionTitleLevel = titleLevel + 1;
          return getHeadingElement(
            { ...params, titleLevel: headingTitleLevel },
            domNode
          );
        }
        if (domNode.name === "details") {
          const items: any[] = [];
          let id = 0;
          const item = getItem(domNode, {
            ...params,
            titleLevel: accordionTitleLevel,
          });
          if (item) {
            items.push({ ...item, id });
          }
          let next = getNextFirstElement(domNode);
          while (next && next.name === "details") {
            id = id + 1;
            const item = getItem(next, {
              ...params,
              titleLevel: accordionTitleLevel,
            });
            if (item) {
              items.push({ ...item, id });
            }
            next = getNextFirstElement(next);
          }

          return items.length ? (
            mapToAccordion(
              accordionTitleLevel,
              !hasDetailsParent(domNode),
              items
            )
          ) : (
            <></>
          );
        }
        if (domNode.name === "table") {
          const tableContent = getFirstElementChild(domNode);
          if (tableContent?.name === "tbody") {
            return mapTbody(tableContent);
          } else {
            return domNode;
          }
        }
        if (domNode.name === "div" && domNode.attribs.class === "alert") {
          return (
            <AccessibleAlert
              severity="info"
              small
              description={renderChildren(domNode, true, options(params))}
              className={["fr-mt-2w", "fr-pb-2w"]}
            />
          );
        }
        if (domNode.name === "div" && domNode.attribs.class === "infographic") {
          console.log(
            "MMA - Rendering infographic: ",
            domNode.attribs["data-infographic-id"] ?? "no id",
            domNode.attribs
          );
          const infoId = domNode.attribs["data-infographic-id"];
          const infographic = params.infographics.find(
            (info) => info.infographicId === infoId
          );
          if (!infographic) {
            console.warn("Missing infography details. Skipping infographic.");
            return <></>;
          }

          const Title = "h2";
          return (
            <div className={fr.cx("fr-mb-8w")}>
              <img
                src={toUrl(infographic.svgFilename)}
                alt={`infographie ${infographic.title}. Description détaillée ci-après.`}
                className={`${fr.cx("fr-mb-3w")} ${infographieImage}`}
              />
              <AccordionWithAnchor
                className={fr.cx("fr-mb-5w")}
                titleAs={`h${titleLevel}`}
                items={[
                  {
                    id: `infographic-description-${Math.random().toString(36).substring(2, 15)}`,
                    title: "Lire la description",
                    content: (
                      <>
                        {parse(
                          xssWrapper(infographic.transcription),
                          options({
                            titleLevel,
                            infographics: params.infographics,
                          })
                        )}
                      </>
                    ),
                  },
                ]}
              />
              <div className="fr-tile fr-tile--download fr-enlarge-link fr-p-3w">
                <div className="fr-tile__body">
                  <div className="fr-tile__content">
                    <Title className="fr-tile__title fr-text--xl fr-mb-0">
                      <a download href={toUrl(infographic.pdfFilename)}>
                        Télécharger l&apos;infographie
                      </a>
                    </Title>
                    <p className="fr-tile__detail fr-mt-3v">
                      Format PDF -{" "}
                      {formatFileSize(infographic.pdfFilesizeOctet)}
                    </p>
                  </div>
                </div>
                <div className="fr-tile__header">
                  <div className="">
                    <Image
                      className="fr-responsive-img"
                      src="/static/assets/img/infographies-download.svg"
                      alt="Télécharger l'infographie"
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        }
        if (domNode.name === "strong") {
          return (
            <strong>{renderChildren(domNode, false, options(params))}</strong>
          );
        }
        if (domNode.name === "ul") {
          return (
            <ul className={fr.cx("fr-pl-5v")}>
              {renderChildren(domNode, false, options(params))}
            </ul>
          );
        }
        if (domNode.name === "em") {
          return <em>{renderChildren(domNode, false, options(params))}</em>;
        }
        if (domNode.name === "p") {
          if (domNode.children && !domNode.children.length) {
            return <br />;
          }
          return (
            <p
              className={
                (domNode.parentNode as Element | undefined)?.name === "li"
                  ? fr.cx("fr-mb-0")
                  : fr.cx("fr-mt-2w")
              }
            >
              {renderChildren(domNode, false, options(params))}
            </p>
          );
        }
        if (domNode.name === "a") {
          return (
            <Link href={domNode.attribs.href} {...domNode.attribs}>
              {renderChildren(domNode, true, options(params))}
            </Link>
          );
        }
      }
    },
    trim: true,
  };
};

const infographieImage = css({
  display: "block",
  marginInline: "auto",
});

type Props = {
  content: string;
  titleLevel: numberLevel;
  extra?: {
    infographics: ContributionInfographicFull[];
  };
};

const DisplayContent = ({
  content,
  titleLevel,
  extra,
}: Props): string | JSX.Element | JSX.Element[] => {
  try {
    return parse(
      xssWrapper(content),
      options({ titleLevel, infographics: extra?.infographics ?? [] })
    );
  } catch (error) {
    console.error("Error parsing HTML content:", error);
    captureException(error);
    return <>Une erreur est survenue lors de l&apos;affichage du contenu.</>;
  }
};

export default DisplayContent;
