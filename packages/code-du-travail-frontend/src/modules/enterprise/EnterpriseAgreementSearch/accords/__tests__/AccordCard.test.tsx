import { render, screen } from "@testing-library/react";
import React from "react";
import { AccordCard } from "../AccordCard";

const defaultAccord = {
  id: "ACCORD_123",
  title: "Accord sur le télétravail",
  dateSignature: "01/01/2023",
};

describe("AccordCard", () => {
  it("affiche le titre et la date de signature", () => {
    render(<AccordCard {...defaultAccord} onClick={() => {}} />);
    expect(screen.getByText("Accord sur le télétravail")).toBeInTheDocument();
    expect(screen.getByText(/Signé le 01\/01\/2023/)).toBeInTheDocument();
  });

  it("le lien pointe vers Légifrance avec l'id de l'accord", () => {
    render(<AccordCard {...defaultAccord} onClick={() => {}} />);
    expect(
      screen.getByRole("link", { name: /Accord sur le télétravail/ })
    ).toHaveAttribute(
      "href",
      "https://www.legifrance.gouv.fr/acco/id/ACCORD_123"
    );
  });

  it("affiche la date de début si fournie", () => {
    render(
      <AccordCard
        {...defaultAccord}
        dateDebut="01/06/2023"
        onClick={() => {}}
      />
    );
    expect(screen.getByText(/Débute le 01\/06\/2023/)).toBeInTheDocument();
  });

  it("n'affiche pas la date de début si non fournie", () => {
    render(<AccordCard {...defaultAccord} onClick={() => {}} />);
    expect(screen.queryByText(/Débute le/)).not.toBeInTheDocument();
  });

  it("affiche la date de fin si fournie", () => {
    render(
      <AccordCard {...defaultAccord} dateFin="31/12/2023" onClick={() => {}} />
    );
    expect(screen.getByText(/Fini le 31\/12\/2023/)).toBeInTheDocument();
  });

  it("n'affiche pas la date de fin si non fournie", () => {
    render(<AccordCard {...defaultAccord} onClick={() => {}} />);
    expect(screen.queryByText(/Fini le/)).not.toBeInTheDocument();
  });

  it("affiche la mention texte intégral si texteIntegral est true", () => {
    render(
      <AccordCard {...defaultAccord} texteIntegral={true} onClick={() => {}} />
    );
    expect(screen.getByText(/Texte intégral/)).toBeInTheDocument();
  });

  it("n'affiche pas la mention texte intégral si texteIntegral est false", () => {
    render(
      <AccordCard {...defaultAccord} texteIntegral={false} onClick={() => {}} />
    );
    expect(screen.queryByText(/Texte intégral/)).not.toBeInTheDocument();
  });

  it("affiche un signataire au singulier", () => {
    render(
      <AccordCard {...defaultAccord} signataires={["CGT"]} onClick={() => {}} />
    );
    expect(screen.getByText(/Signataire\s*:/)).toBeInTheDocument();
    expect(screen.getByText(/CGT/)).toBeInTheDocument();
  });

  it("affiche plusieurs signataires au pluriel", () => {
    render(
      <AccordCard
        {...defaultAccord}
        signataires={["CGT", "CFDT", "FO"]}
        onClick={() => {}}
      />
    );
    expect(screen.getByText(/Signataires\s*:/)).toBeInTheDocument();
    expect(screen.getByText(/CGT, CFDT, FO/)).toBeInTheDocument();
  });

  it("n'affiche pas la section signataires si le tableau est vide", () => {
    render(
      <AccordCard {...defaultAccord} signataires={[]} onClick={() => {}} />
    );
    expect(screen.queryByText(/Signataire/)).not.toBeInTheDocument();
  });

  it("affiche un thème au singulier", () => {
    render(
      <AccordCard
        {...defaultAccord}
        themes={["Télétravail"]}
        onClick={() => {}}
      />
    );
    expect(screen.getByText(/^Thème\s*:/)).toBeInTheDocument();
    expect(screen.getByText(/Télétravail/)).toBeInTheDocument();
  });

  it("affiche plusieurs thèmes au pluriel", () => {
    render(
      <AccordCard
        {...defaultAccord}
        themes={["Télétravail", "Salaire"]}
        onClick={() => {}}
      />
    );
    expect(screen.getByText(/^Thèmes\s*:/)).toBeInTheDocument();
    expect(screen.getByText(/Télétravail, Salaire/)).toBeInTheDocument();
  });

  it("n'affiche pas la section thèmes si non fournie", () => {
    render(<AccordCard {...defaultAccord} onClick={() => {}} />);
    expect(screen.queryByText(/^Thème/)).not.toBeInTheDocument();
  });
});
