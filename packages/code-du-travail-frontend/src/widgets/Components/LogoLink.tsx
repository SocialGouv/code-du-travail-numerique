import Link from "next/link";
import styled from "styled-components";
import { icons, theme } from "@socialgouv/cdtn-ui";

export const LogoLink = () => {
  return (
    <Link passHref href="/" legacyBehavior>
      <LeftLink target="_blank">
        <Logo />
      </LeftLink>
    </Link>
  );
};

const Logo = styled(icons.Logo)`
  width: auto;
  height: 7rem;
  color: ${({ theme }) => theme.primary};
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 5rem;
  }
`;
const LeftLink = styled.a`
  &:after {
    content: "" !important;
  }
`;
