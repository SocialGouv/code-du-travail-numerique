import NextLink from "next/link";
import { A11yLink } from "../../common/A11yLink";

export const Link = ({ children, href }) => {
  if (!href.includes("http")) {
    return <NextLink href={href}>{children}</NextLink>;
  }
  return (
    <A11yLink href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </A11yLink>
  );
};
