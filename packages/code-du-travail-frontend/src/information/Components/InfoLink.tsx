import Link from "next/link";
import { A11yLink } from "../../common/A11yLink";

export const InfoLink = ({ children, href }) => {
  if (!href.includes("http")) {
    return (
      <Link href={href} passHref>
        <a>{children}</a>
      </Link>
    );
  }
  return (
    <A11yLink href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </A11yLink>
  );
};
