import { useRouter } from "next/router";
import { Accordion } from "@socialgouv/cdtn-ui";
import React, { useEffect } from "react";
import { slugify } from "@socialgouv/cdtn-utils";

export const AccordionWithAnchor = ({ items, ...props }): JSX.Element => {
  const { asPath } = useRouter();
  const [anchor, setAnchor] = React.useState<string[]>([]);

  useEffect(() => {
    const hash = asPath.split("#")[1];
    if (hash) setAnchor([hash]);
  }, [asPath]);

  const itemsWithId = items.map(({ id, ...item }) => {
    return {
      ...item,
      id: id ?? slugify(item.title),
    };
  });

  return (
    <Accordion
      key={anchor.join(",")} // Add key prop to force rerender when anchor array changes
      preExpanded={anchor}
      items={itemsWithId}
      {...props}
    />
  );
};
