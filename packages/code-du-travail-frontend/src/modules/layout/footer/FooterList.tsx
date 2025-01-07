import { fr } from "@codegouvfr/react-dsfr";
import React from "react";

interface FooterLink {
  href: string;
  label: string;
}

interface FooterListProps {
  title: string;
  links: FooterLink[];
}

export const FooterList = ({ title, links }: FooterListProps) => (
  <div className={fr.cx("fr-col-12", "fr-col-sm-3", "fr-col-md-2")}>
    <h3 className={fr.cx("fr-footer__top-cat")}>{title}</h3>
    <ul className={fr.cx("fr-footer__top-list")}>
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.href} className={fr.cx("fr-footer__top-link")}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
