import parse, {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
  Text,
} from "html-react-parser";
import { xssWrapper } from "../../lib";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { ElementType } from "react";
import { AccordionWithAnchor } from "../common/AccordionWithAnchor";
import { v4 as generateUUID } from "uuid";
import { fr } from "@codegouvfr/react-dsfr";
import { FicheServicePublic } from "../fiche-service-public/builder";

const DEFAULT_HEADING_LEVEL = 3;
export type numberLevel = 2 | 3 | 4 | 5 | 6;

export const ContentSP = ({ raw, titleLevel }) => {
  return (
    <>
      {raw && (
        <div>
          <FicheServicePublic
            data={JSON.parse(raw).children}
            headingLevel={titleLevel}
          />
        </div>
      )}
    </>
  );
};

const mapItem = (
  titleLevel: numberLevel,
  domNode: Element,
  summary: Element
) => ({
  content: domToReact(
    domNode.children as DOMNode[],
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
const mapToAccordion = (titleLevel: numberLevel, items) => {
  const props = titleLevel <= 6 ? { titleLevel } : {};

  return (
    <div className={fr.cx("fr-my-3w")}>
      <AccordionWithAnchor
        {...props}
        data-testid="contrib-accordion"
        items={items.map((item) => ({
          ...item,
          ...(titleLevel === DEFAULT_HEADING_LEVEL
            ? { id: undefined }
            : { id: generateUUID() }),
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
                            child.children.map((c) => ({
                              ...c,
                              name: "th",
                            })) as DOMNode[],
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
              <tbody>
                {domToReact(tbody.children as DOMNode[], { trim: true })}
              </tbody>
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

function renderChildrenWithNoTrim(domNode) {
  return domToReact(domNode.children as DOMNode[]);
}

const getHeadingElement = (titleLevel: numberLevel, domNode) => {
  const Tag = ("h" + titleLevel) as ElementType;
  return titleLevel <= 6 ? (
    <Tag className={fr.cx("fr-mt-2w")}>{renderChildrenWithNoTrim(domNode)}</Tag>
  ) : (
    <strong className={fr.cx("fr-mt-2w")}>
      {renderChildrenWithNoTrim(domNode)}
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
            mapToAccordion(accordionTitleLevel, items)
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
              description={domToReact(domNode.children as DOMNode[], {
                trim: true,
              })}
              className={fr.cx("fr-mt-2w")}
            ></Alert>
          );
        }
        if (domNode.name === "strong") {
          // Disable trim on strong
          return <strong>{renderChildrenWithNoTrim(domNode)}</strong>;
        }
        if (domNode.name === "em") {
          // Disable trim on em
          return <em>{renderChildrenWithNoTrim(domNode)}</em>;
        }
        if (domNode.name === "p") {
          if (!domNode.children.length) {
            return <br />;
          }
          // Disable trim on p
          return (
            <p
              className={
                (domNode.parentNode as Element | undefined)?.name === "li"
                  ? fr.cx("fr-mb-0")
                  : fr.cx("fr-mt-2w")
              }
            >
              {renderChildrenWithNoTrim(domNode)}
            </p>
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
const DisplayContentContribution = ({
  content,
  titleLevel,
}: Props): string | JSX.Element | JSX.Element[] => {
  return <div>{parse(xssWrapper(content), options(titleLevel))}</div>;
};

export default DisplayContentContribution;
