import parse, {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
  Text,
} from "html-react-parser";
import { toUrl, xssWrapper } from "../../lib";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { ElementType } from "react";
import { AccordionWithAnchor } from "./AccordionWithAnchor";
import { v4 as generateUUID } from "uuid";
import { fr } from "@codegouvfr/react-dsfr";
import ImageWrapper from "./ImageWrapper";
import { Tile } from "@codegouvfr/react-dsfr/Tile";
import Link from "./Link";
import { slugify } from "@socialgouv/cdtn-utils";

export type numberLevel = 2 | 3 | 4 | 5 | 6;

const mapItem = (
  titleLevel: numberLevel,
  domNode: Element,
  summary: Element
) => ({
  content: renderChildren(
    domNode,
    true,
    options((titleLevel + 1) as numberLevel)
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

function getItem(domNode: Element, titleLevel: numberLevel) {
  const summary = getFirstElementChild(domNode);
  if (summary && summary.name === "summary") {
    const mapI = mapItem(titleLevel, domNode, summary);
    return mapI;
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

const getHeadingElement = (titleLevel: numberLevel, domNode) => {
  const Tag = ("h" + titleLevel) as ElementType;
  return titleLevel <= 6 ? (
    <Tag className={fr.cx("fr-mt-2w")}>
      {renderChildren(domNode, false, options(titleLevel))}
    </Tag>
  ) : (
    <strong className={fr.cx("fr-mt-2w")}>
      {renderChildren(domNode, false, options(titleLevel))}
    </strong>
  );
};

const options = (titleLevel: numberLevel): HTMLReactParserOptions => {
  let accordionTitleLevel = titleLevel;
  let headingTitleLevel = titleLevel;

  return {
    replace(domNode) {
      if (domNode instanceof Element) {
        if (domNode.name === "span" && domNode.attribs.class === "title") {
          accordionTitleLevel = titleLevel + 1;
          headingTitleLevel = titleLevel + 1;
          return getHeadingElement(titleLevel, domNode);
        }
        if (domNode.name === "span" && domNode.attribs.class === "sub-title") {
          accordionTitleLevel = titleLevel + 1;
          return getHeadingElement(headingTitleLevel, domNode);
        }
        if (domNode.name === "details") {
          const items: any[] = [];
          let id = 0;
          const item = getItem(domNode, accordionTitleLevel);
          if (item) {
            items.push({ ...item, id });
          }
          let next = getNextFirstElement(domNode);
          while (next && next.name === "details") {
            id = id + 1;
            const item = getItem(next, accordionTitleLevel);
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
            <Alert
              severity="info"
              small
              description={renderChildren(domNode, true, options(titleLevel))}
              className={fr.cx("fr-mt-2w", "fr-pb-2w")}
            ></Alert>
          );
        }
        if (domNode.name === "div" && domNode.attribs.class === "infographic") {
          const pdfName = domNode.attribs["data-pdf"];
          const pdfSize = domNode.attribs["data-pdf-size"];
          const pictoName = domNode.attribs["data-infographic"];
          // Remove the img tag. It contains an absolute path. We need to build our own path.
          const firstChild =
            domNode.children.length > 0 ? domNode.children[0] : undefined;
          if (
            firstChild &&
            firstChild.type === "tag" &&
            firstChild.name === "img"
          ) {
            domNode.children.shift();
          }

          return (
            <div>
              <ImageWrapper altText={""} src={toUrl(pictoName)} />
              {renderChildren(
                domNode,
                true,
                options(titleLevel as numberLevel)
              )}
              <Tile
                downloadButton
                enlargeLinkOrButton
                imageSvg={false}
                imageUrl={`/static/assets/img/modeles-de-courriers-download.svg`}
                title={`Télécharger l'infographie`}
                titleAs={`h${titleLevel}`}
                detail={<p>Format PDF - {pdfSize}Ko</p>}
                imageAlt={""}
                linkProps={{
                  href: toUrl(pdfName),
                }}
              />
            </div>
          );
        }
        if (domNode.name === "strong") {
          return (
            <strong>
              {renderChildren(domNode, false, options(titleLevel))}
            </strong>
          );
        }
        if (domNode.name === "ul") {
          return (
            <ul className={fr.cx("fr-pl-5v")}>
              {renderChildren(domNode, false, options(titleLevel))}
            </ul>
          );
        }
        if (domNode.name === "em") {
          return <em>{renderChildren(domNode, false, options(titleLevel))}</em>;
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
              {renderChildren(domNode, false, options(titleLevel))}
            </p>
          );
        }
        if (domNode.name === "a") {
          return (
            <Link href={domNode.attribs.href} {...domNode.attribs}>
              {renderChildren(domNode, true, options(titleLevel))}
            </Link>
          );
        }
      }
    },
    trim: true,
  };
};

type Props = {
  content: string;
  titleLevel: numberLevel;
};
const DisplayContent = ({
  content,
  titleLevel,
}: Props): string | JSX.Element | JSX.Element[] => {
  try {
    return <div>{parse(xssWrapper(content), options(titleLevel))}</div>;
  } catch (error) {
    console.error("Error parsing HTML content:", error);
    return (
      <div>Une erreur est survenue lors de l&apos;affichage du contenu.</div>
    );
  }
};

export default DisplayContent;
