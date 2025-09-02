import React, { type ReactNode } from "react";
import Link from "next/link";

// Simplified Card props for specific use case
export type CardProps = {
  className?: string;
  title: ReactNode;
  desc?: ReactNode;
  size?: "large";
  enlargeLink?: boolean;
  border?: boolean;
  linkProps?: {
    href: string;
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

// Utility function to combine class names
const cx = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

export const Card: React.FC<CardProps> = ({
  className,
  title,
  desc,
  size,
  enlargeLink = false,
  border = false,
  linkProps,
  classes = {},
}) => {
  // Build the root CSS classes
  const rootClasses = cx(
    "fr-card",
    enlargeLink && "fr-enlarge-link",
    size === "large" && "fr-card--lg",
    border && "fr-card--border",
    classes.root,
    className
  );

  // Link component for internal/external navigation
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

  return (
    <div className={rootClasses}>
      <div className="fr-card__body">
        <div className={cx("fr-card__content", classes.content)}>
          <h3 className={cx("fr-card__title", classes.title)}>
            {linkProps ? <button>{title}</button> : title}
          </h3>
          {desc && <p className={cx("fr-card__desc", classes.desc)}>{desc}</p>}
          <div className={cx("fr-card__end", classes.end)}></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
