import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "../Table"; // Adjust the import path as necessary
import { FicheSPDataTableau } from "../../type"; // Adjust the import path as necessary

describe("Table Component", () => {
  const mockData = {
    type: "element",
    name: "Tableau",
    children: [
      {
        type: "element",
        name: "Colonne",
        attributes: { type: "header" },
        children: [],
      },
      {
        type: "element",
        name: "Colonne",
        attributes: { type: "normal" },
        children: [],
      },
      {
        type: "element",
        name: "Rangée",
        attributes: { type: "header" },
        children: [
          {
            type: "element",
            name: "Cellule",
            children: [
              {
                type: "element",
                name: "Texte",
                children: [{ type: "text", text: "Header 1" }],
              },
            ],
          },
          {
            type: "element",
            name: "Cellule",
            children: [
              {
                type: "element",
                name: "Texte",
                children: [{ type: "text", text: "Header 2" }],
              },
            ],
          },
        ],
      },
      {
        type: "element",
        name: "Rangée",
        attributes: { type: "normal" },
        children: [
          {
            type: "element",
            name: "Cellule",
            children: [
              {
                type: "element",
                name: "Texte",
                children: [{ type: "text", text: "Row Header" }],
              },
            ],
          },
          {
            type: "element",
            name: "Cellule",
            children: [
              {
                type: "element",
                name: "Texte",
                children: [{ type: "text", text: "Data" }],
              },
            ],
          },
        ],
      },
    ],
  } as FicheSPDataTableau;

  it('adds scope="row" to th elements in tbody', () => {
    render(<Table data={mockData} headingLevel={1} />);

    // Find th in tbody (row header)
    const rowHeader = screen.getByRole("rowheader", { name: /Row Header/i });
    expect(rowHeader).toHaveAttribute("scope", "row");

    // Ensure td does not have scope
    const dataCell = screen.getByRole("cell", { name: /Data/i });
    expect(dataCell).not.toHaveAttribute("scope");
  });
});
