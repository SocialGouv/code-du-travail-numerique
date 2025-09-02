import React, { type ReactNode } from "react";
import Link from "next/link";
import { fr } from "@codegouvfr/react-dsfr";
import { css, cx } from "@styled-system/css";

export type CardProps = {
  className?: string;
  title: ReactNode;
  titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
  desc?: ReactNode;
  end?: ReactNode;
  size?: "small" | "medium" | "large";
  enlargeLink?: boolean;
  border?: boolean;
  linkProps?: {
    href?: string;
    target?: string;
    onClick?: (event: React.MouseEvent) => void;
  };
  classes?: {
    root?: string;
    title?: string;
    content?: string;
    desc?: string;
    end?: string;
  };
};

export const EnterpriseCard: React.FC<CardProps> = ({
  className,
  title,
  titleAs: HtmlTitleTag = "h3",
  desc,
  end,
  size = "medium",
  enlargeLink = false,
  border = true,
  linkProps,
  classes = {},
}) => {
  return (
    <div
      className={cx(
        fr.cx(
          "fr-card",
          enlargeLink && "fr-enlarge-link",
          (() => {
            switch (size) {
              case "large":
                return "fr-card--lg";
              case "small":
                return "fr-card--sm";
              case "medium":
                return undefined;
            }
          })(),
          !border && "fr-card--no-border"
        ),
        classes.root,
        className
      )}
    >
      <div className={fr.cx("fr-card__body")}>
        <div className={cx(fr.cx("fr-card__content"), classes.content)}>
          <HtmlTitleTag className={cx(fr.cx("fr-card__title"), classes.title)}>
            {linkProps ? (
              linkProps.href ? (
                <LinkComponent
                  href={linkProps.href}
                  target={linkProps.target}
                  onClick={linkProps.onClick}
                >
                  {title}
                </LinkComponent>
              ) : (
                <button
                  type="button"
                  onClick={linkProps.onClick}
                  className={buttonStyle}
                >
                  {title}
                </button>
              )
            ) : (
              title
            )}
          </HtmlTitleTag>
          {desc && (
            <p className={cx(fr.cx("fr-card__desc"), classes.desc)}>{desc}</p>
          )}
          {end && (
            <div className={cx(fr.cx("fr-card__end"), classes.end)}>{end}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const LinkComponent = ({
  href,
  target,
  onClick,
  children,
}: {
  href: string;
  target?: string;
  onClick?: (event: React.MouseEvent) => void;
  children: ReactNode;
}) => {
  const isExternal = href.startsWith("http") || target === "_blank";

  if (isExternal || href === "#") {
    return (
      <a href={href} target={target} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick}>
      {children}
    </Link>
  );
};

const buttonStyle = css({
  background: "none",
  border: "none",
  padding: 0,
  font: "inherit",
  cursor: "pointer",
  textAlign: "inherit",
  color: "inherit",
  width: "100%",
  textDecoration: "none",
  _disabled: {
    cursor: "not-allowed",
  },
});
