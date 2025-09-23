"use client";

import React, {
  forwardRef,
  memo,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from "react";

export type AccordionProps =
  | AccordionProps.Controlled
  | AccordionProps.Uncontrolled;

export namespace AccordionProps {
  export type Common = {
    className?: string;
    id?: string;
    titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
    label: ReactNode;
    classes?: Partial<
      Record<"root" | "accordion" | "title" | "collapse", string>
    >;
    style?: CSSProperties;
    children: NonNullable<ReactNode>;
  };

  export type Uncontrolled = Common & {
    defaultExpanded?: boolean;
    expanded?: never;
    onExpandedChange?: (
      expanded: boolean,
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
  };

  export type Controlled = Common & {
    defaultExpanded?: never;
    expanded: boolean;
    onExpandedChange: (
      expanded: boolean,
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
  };
}

const generateId = (prefix: string) => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

const cx = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

/** Base Accordion component without react-dsfr dependencies */
export const BaseAccordion = memo(
  forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
    const {
      className,
      id: id_props,
      titleAs: HtmlTitleTag = "h3",
      label,
      classes = {},
      style,
      children,
      expanded: expanded_props,
      defaultExpanded = false,
      onExpandedChange,
      ...rest
    } = props;

    const id = id_props || generateId("fr-accordion");
    const collapseElementId = `${id}-collapse`;

    const [isExpanded, setIsExpanded] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
      // Initialisation après hydratation pour éviter les problèmes SSR/CSR
      if (!isInitialized) {
        setIsExpanded(expanded_props ?? defaultExpanded);
        setIsInitialized(true);
      } else if (expanded_props !== undefined) {
        setIsExpanded(expanded_props);
      }
    }, [expanded_props, defaultExpanded, isInitialized]);

    const onExtendButtonClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const isExpanded_newValue = !isExpanded;

        onExpandedChange?.(isExpanded_newValue, event);

        if (expanded_props === undefined) {
          setIsExpanded(isExpanded_newValue);
        }
      },
      [isExpanded, onExpandedChange, expanded_props]
    );

    return (
      <section
        className={cx(
          "fr-accordion",
          (isExpanded || (!isInitialized && defaultExpanded)) &&
            "fr-accordion--expanded",
          className,
          classes.root
        )}
        style={style}
        ref={ref}
        {...rest}
      >
        <HtmlTitleTag className={cx("fr-accordion__title", classes.title)}>
          <button
            className={cx("fr-accordion__btn", classes.accordion)}
            aria-expanded={isExpanded || (!isInitialized && defaultExpanded)}
            aria-controls={collapseElementId}
            onClick={onExtendButtonClick}
            type="button"
            id={`${id}__toggle-btn`}
          >
            {label}
          </button>
        </HtmlTitleTag>
        <div
          className={cx(
            "fr-collapse",
            (isExpanded || (!isInitialized && defaultExpanded)) &&
              "fr-collapse--expanded",
            classes.collapse
          )}
          id={collapseElementId}
          style={{
            display:
              isExpanded || (!isInitialized && defaultExpanded)
                ? "block"
                : "none",
          }}
        >
          {children}
        </div>
      </section>
    );
  })
);

BaseAccordion.displayName = "BaseAccordion";

export default BaseAccordion;
