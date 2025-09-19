"use client";
import React from "react";
import { filterOutTitle, getTitleInChildren } from "../utils";
import { ElementBuilder } from "./ElementBuilder";
import Title from "./Title";
import { FicheSPDataBlocCas, FicheSPDataListeSituations } from "../type";
import { css } from "@styled-system/css";

export const Tabulator = ({
  data,
  headingLevel,
  defaultTabIndex = 0,
}: {
  data: FicheSPDataBlocCas | FicheSPDataListeSituations;
  headingLevel: number;
  defaultTabIndex?: number;
}) => {
  // Prepare tabs data
  const tabs = data.children.map((tab) => {
    const title = getTitleInChildren(tab);
    return {
      label: title,
      content: (
        <>
          <Title className={"fr-sr-only"} level={headingLevel}>
            {title}
          </Title>
          <ElementBuilder
            data={filterOutTitle(tab)}
            headingLevel={headingLevel + 1}
          />
        </>
      ),
    };
  });

  return (
    <div className={css({})}>
      <div className="fr-tabs fr-mb-4w" data-fr-js-tabs="true">
        <ul className="fr-tabs__list" role="tablist">
          {tabs.map((tab, index) => (
            <li role="presentation" key={`tab-${index}`}>
              <button
                id={`tab-${index}`}
                className={`fr-tabs__tab fr-tabs__tab--icon-left ${index === defaultTabIndex ? "fr-tabs__tab--active" : ""}`}
                tabIndex={index === defaultTabIndex ? 0 : -1}
                role="tab"
                aria-selected={index === defaultTabIndex}
                aria-controls={`panel-${index}`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        {tabs.map((tab, index) => (
          <div
            key={`panel-${index}`}
            id={`panel-${index}`}
            className={`fr-tabs__panel ${index === defaultTabIndex ? "fr-tabs__panel--selected" : ""}`}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
            tabIndex={0}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabulator;
