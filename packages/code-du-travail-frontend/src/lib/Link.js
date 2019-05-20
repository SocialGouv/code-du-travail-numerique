import React from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";

const Link = ({ pathname, query, alias, slugKey, children, ...props }) => {
  const aliasSlug = query[slugKey];
  let nextAlias = `/${alias || pathname}${aliasSlug ? `/${aliasSlug}` : ""}`;

  Object.entries(query)
    .filter(([key]) => key !== slugKey)
    .forEach(([key, value], index) => {
      nextAlias += `${index ? "&" : "?"}${key}=${value}`;
    });

  nextAlias = encodeURI(nextAlias);

  return (
    <NextLink
      href={{
        pathname: `/${pathname}`,
        query
      }}
      as={nextAlias}
      {...props}
    >
      {children}
    </NextLink>
  );
};

Link.propTypes = {
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object,
  slugKey: PropTypes.string
};

Link.defaultProps = {
  query: {},
  slugKey: "slug"
};

export default Link;
