"use client";
import React, { useMemo } from "react";
import { v4 as generateUUID } from "uuid";
import { filterOutTitle, getTitleInChildren } from "../utils";
import { ElementBuilder } from "./ElementBuilder";
import Title from "./Title";
import { FicheSPDataBlocCas, FicheSPDataListeSituations } from "../type";

export const Tabulator = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataBlocCas | FicheSPDataListeSituations;
  headingLevel: number;
}) => {
  const uniquePrefix = useMemo(() => generateUUID(), []);

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
    <div>
      <div className="fr-tabs fr-mb-4w" data-fr-js-tabs="true">
        <ul className="fr-tabs__list" role="tablist">
          {tabs.map((tab, index) => (
            <li role="presentation" key={`tab-${uniquePrefix}-${index}`}>
              <button
                id={`tab-${uniquePrefix}-${index}`}
                className={`fr-tabs__tab fr-tabs__tab--icon-left ${index === 0 ? "fr-tabs__tab--active" : ""}`}
                role="tab"
                aria-selected={index === 0}
                aria-controls={`panel-${uniquePrefix}-${index}`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        {tabs.map((tab, index) => (
          <div
            key={`panel-${uniquePrefix}-${index}`}
            id={`panel-${uniquePrefix}-${index}`}
            className={`fr-tabs__panel ${index === 0 ? "fr-tabs__panel--selected" : ""}`}
            role="tabpanel"
            aria-labelledby={`tab-${uniquePrefix}-${index}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabulator;
