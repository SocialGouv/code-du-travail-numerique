import React, { useState } from "react";
import { filterOutTitle, getTitleInChildren } from "../utils";
import { ElementBuilder } from "./ElementBuilder";
import Title from "./Title";
import { FicheSPDataBlocCas, FicheSPDataListeSituations } from "../type";
import { css } from "@styled-system/css";

export const Tabulator = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataBlocCas | FicheSPDataListeSituations;
  headingLevel: number;
}) => {
  const [activeTab, setActiveTab] = useState(0);

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

  // Define container styles
  const tabsContainerStyle = css({
    position: "relative",
  });

  return (
    <div className={tabsContainerStyle}>
      <div className={`fr-tabs fr-mb-4w`} data-fr-js-tabs="true">
        <ul className="fr-tabs__list" role="tablist">
          {tabs.map((tab, index) => (
            <li role="presentation" key={`tab-${index}`}>
              <button
                id={`tab-${index}`}
                className={`fr-tabs__tab fr-tabs__tab--icon-left ${index === activeTab ? "fr-tabs__tab--active" : ""}`}
                tabIndex={index === activeTab ? 0 : -1}
                role="tab"
                aria-selected={index === activeTab}
                aria-controls={`panel-${index}`}
                onClick={() => setActiveTab(index)}
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
            className={`fr-tabs__panel ${index === activeTab ? "fr-tabs__panel--selected" : ""}`}
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
