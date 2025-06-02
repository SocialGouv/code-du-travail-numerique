import React from "react";
import { IntegrationDetailContent } from "./IntegrationDetailContent";
import { Widget, SelectItem } from "./types";
import { ContainerList } from "../layout/ContainerList";

export interface IntegrationDetailPageContentProps {
  widget: Widget;
  host: string;
  selectOptions?: SelectItem[] | null;
}

export const IntegrationDetailPageContent = ({
  widget,
  host,
  selectOptions,
}: IntegrationDetailPageContentProps) => {
  return (
    <ContainerList
      title={widget.shortTitle}
      segments={[
        {
          label: "Intégrer les outils du Code du travail numérique",
          linkProps: { href: "/integration" },
        },
      ]}
    >
      <IntegrationDetailContent
        id={widget.id}
        description={widget.description}
        title={widget.title}
        shortTitle={widget.shortTitle}
        url={widget.url}
        host={host}
        messages={widget.messages}
        selectOptions={selectOptions}
      />
    </ContainerList>
  );
};
