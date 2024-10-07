import { formatIdcc } from "@socialgouv/modeles-social";
import { Button, Paragraph, theme } from "@socialgouv/cdtn-ui";
import { push as matopush } from "@socialgouv/matomo-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { Agreement } from "../../outils/types";

type Props = {
  convention: Agreement;
  isFirst?: boolean;
  onClick?: (agreement: Agreement) => void;
  small?: boolean;
};

const ConventionContent = ({
  convention,
  highlight,
}: {
  convention: Agreement;
  highlight: any;
}) => (
  <>
    {convention.shortTitle} <IDCC>(IDCC {formatIdcc(convention.num)})</IDCC>
    {highlight && highlight.searchInfo && (
      <Paragraph variant="altText" noMargin>
        {highlight.searchInfo}
      </Paragraph>
    )}
  </>
);

const DisabledConvention = ({
  convention,
  commonProps,
}: {
  convention: Agreement;
  commonProps: any;
}) => (
  <StyledLinkedDisabled {...commonProps}>
    <ConventionContent
      convention={convention}
      highlight={convention.highlight}
    />
    <StyledDisabledParagraph variant="altText" noMargin>
      Cette convention collective déclarée par l’entreprise n’est pas reconnue
      par notre site
    </StyledDisabledParagraph>
  </StyledLinkedDisabled>
);

const EnabledConvention = ({
  convention,
  commonProps,
  onClick,
}: {
  convention: Agreement;
  commonProps: any;
  onClick?: (agreement: Agreement) => void;
}) => (
  <>
    {onClick ? (
      <StyledLink as={Button} variant="navLink" {...commonProps}>
        <ConventionContent
          convention={convention}
          highlight={convention.highlight}
        />
      </StyledLink>
    ) : (
      <Link
        href={`/convention-collective/${convention.slug}`}
        passHref
        legacyBehavior
      >
        <StyledLink {...commonProps}>
          <ConventionContent
            convention={convention}
            highlight={convention.highlight}
          />
        </StyledLink>
      </Link>
    )}
  </>
);

export const ConventionLink = ({
  convention,
  isFirst,
  onClick,
  small = false,
}: Props): JSX.Element => {
  const { num } = convention;
  const router = useRouter();

  const clickHandler = () => {
    matopush(["trackEvent", "cc_select", router.asPath, convention.shortTitle]);
    onClick && onClick(convention);
  };

  const commonProps = {
    isFirst,
    onClick: clickHandler,
    small,
  };

  return (
    <>
      {!convention.slug ? (
        <DisabledConvention convention={convention} commonProps={commonProps} />
      ) : (
        <EnabledConvention
          convention={convention}
          commonProps={commonProps}
          onClick={onClick}
        />
      )}
    </>
  );
};

const { spacings } = theme;

const StyledLink = styled.a`
  display: block;
  padding: ${({ small }) => (small ? spacings.xsmall : spacings.base)} 0;
  ${({ isFirst }) => isFirst && "padding-top: 0;"}
  color: ${({ theme }) => theme.secondary};
  font-weight: 600;
  text-align: left;
  text-decoration: none;
`;

const StyledLinkedDisabled = styled(StyledLink)`
  color: ${({ theme }) => theme.placeholder};
  pointer-events: none;
  cursor: default;
`;

const StyledDisabledParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.placeholder};
`;

const IDCC = styled.span`
  font-weight: normal;
`;
