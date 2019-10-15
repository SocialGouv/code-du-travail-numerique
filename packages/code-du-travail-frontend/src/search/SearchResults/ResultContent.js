import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { theme } from "@socialgouv/react-ui";
import { SOURCES, getLabelBySource, getRouteBySource } from "@cdt/sources";
import { LargeLink } from "@cdt/ui-old";

const ResultCategory = ({ breadcrumbs, source, author, isThemePage }) => {
  const showTheme = !isThemePage && source !== SOURCES.THEMES;
  if (showTheme && Array.isArray(breadcrumbs) && breadcrumbs.length) {
    const breadcrumb = breadcrumbs.pop();
    return (
      <Link
        key={breadcrumb.slug}
        href="/themes/[slug]"
        as={`/themes/${breadcrumb.slug}`}
        passHref
      >
        <a title={`Voir le theme ${breadcrumb.title}`}>{breadcrumb.title}</a>
      </Link>
    );
  }
  return `${getLabelBySource(source)}${author ? ` - ${author}` : ""}`;
};

const ResultLink = ({ source, title, query, slug, url, children, focused }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (focused && ref.current) {
      ref.current.focus();
    }
  }, [focused]);
  if (source === SOURCES.EXTERNALS) {
    return (
      <Link href={url} passHref>
        <a ref={ref} className="no-after" target="_blank" title={title}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <Link
      href={{
        pathname: `/${getRouteBySource(source)}/[slug]`,
        query: { ...(query && { q: query }), slug: slug }
      }}
      as={`/${getRouteBySource(source)}/${slug}${query ? `?q=${query}` : ""}`}
      passHref
    >
      <a ref={ref} title={title}>
        {children}
      </a>
    </Link>
  );
};

export const ResultContent = props => {
  const { description = "", title, slug, url, source, query, focused } = props;
  const summary =
    description.length > 160
      ? description.slice(0, description.indexOf(" ", 160)) + "…"
      : description;
  return (
    <LargeLink
      as="span"
      variant={source === SOURCES.TOOLS ? "highlight" : "light"}
    >
      <Category>
        <ResultCategory {...props} />
      </Category>
      <ResultLink
        url={url}
        focused={focused}
        source={source}
        query={query}
        slug={slug}
      >
        <H3 noMargin={!summary}>{title}</H3>
      </ResultLink>
      {summary && <Summary>{summary}</Summary>}
    </LargeLink>
  );
};

const { colors, fonts } = theme;

const Category = styled.p`
  margin: 0;
  font-size: ${fonts.sizeSmall};
`;

const H3 = styled.h3`
  ${({ noMargin }) => (noMargin ? `margin: 0;` : `margin-top: 0;`)}
  font-size: ${fonts.sizeH5};
  font-weight: bold;
`;

const Summary = styled.p`
  margin: 0;
  color: ${colors.darkText};
`;
