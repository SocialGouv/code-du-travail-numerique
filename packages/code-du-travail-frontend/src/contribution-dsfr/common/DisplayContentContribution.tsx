import parse, {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import { fr } from "@codegouvfr/react-dsfr";
import { xssWrapper } from "../../lib";
import Accordion from "@codegouvfr/react-dsfr/Accordion";
import CallOut from "@codegouvfr/react-dsfr/CallOut";

type AccordionItem = {
  body: string | JSX.Element | JSX.Element[];
  title: string | JSX.Element | JSX.Element[];
};
const mapItem = (
  titleLevel: number,
  domNode: Element,
  summary: Element
): AccordionItem => ({
  body: domToReact(domNode.children as DOMNode[], options(titleLevel + 1)),
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
const mapToAccordion = (titleLevel: number, items: AccordionItem[]) => (
  <div className={fr.cx("fr-accordions-group")}>
    {items.map((item, index) => {
      return (
        <Accordion key={`item-${index}`} label={item.title}>
          {item.body}
        </Accordion>
      );
    })}
  </div>
);

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
    (previousValue, currentValue, currentIndex, array) =>
      currentValue > previousValue ? currentValue : previousValue,
    0
  );
  return maxRowspan === -1 ? 1 : maxRowspan;
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
    <table>
      {theadChildren.length > 0 && (
        <thead>
          {theadChildren.map((child, index) => (
            <tr key={`tr-${index}`}>
              {domToReact(child.children as DOMNode[], { trim: true })}
            </tr>
          ))}
        </thead>
      )}
      <tbody>{domToReact(tbody.children as DOMNode[], { trim: true })}</tbody>
    </table>
  );
};

function getItem(domNode: Element, titleLevel: number) {
  const summary = getFirstElementChild(domNode);
  if (summary && summary.name === "summary") {
    return mapItem(titleLevel, domNode, summary);
  }
}

const options = (titleLevel: number): HTMLReactParserOptions => ({
  replace(domNode) {
    if (domNode instanceof Element) {
      if (domNode.name === "h3") {
        titleLevel = 4;
      }
      if (domNode.name === "details") {
        const items: any[] = [];
        const item = getItem(domNode, titleLevel);
        if (item) {
          items.push(item);
        }
        let next = getNextFirstElement(domNode);
        while (next && next.name === "details") {
          const item = getItem(next, titleLevel);
          if (item) {
            items.push(item);
          }
          next = getNextFirstElement(next);
        }
        return items.length ? mapToAccordion(titleLevel, items) : <></>;
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
          <CallOut>{domToReact(domNode.children as DOMNode[], { trim: true })}</CallOut>
        );
      }
      if (domNode.name === "p" && !domNode.children.length) {
        return <></>;
      }
      if (domNode.name === "strong") {
        // Disable trim on strong
        return (
          <strong>
            {domToReact(domNode.children as DOMNode[], { trim: false })}
          </strong>
        );
      }
      if (domNode.name === "em") {
        // Disable trim on em
        return (
          <em>{domToReact(domNode.children as DOMNode[], { trim: false })}</em>
        );
      }
      if (domNode.name === "p") {
        // Disable trim on p
        return (
          <p>{domToReact(domNode.children as DOMNode[], { trim: false })}</p>
        );
      }
    }
  },
  trim: true,
});

type Props = {
  content: string;
};
const DisplayContentContribution = ({
  content,
}: Props): string | JSX.Element | JSX.Element[] => {
  return parse(xssWrapper(content), options(3));
};

export default DisplayContentContribution;
