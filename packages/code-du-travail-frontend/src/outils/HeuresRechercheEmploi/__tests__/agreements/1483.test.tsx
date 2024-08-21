
        import { HeuresRechercheEmploi } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 1483,
          "shortTitle": "Transports routiers et activités auxiliaires du transport",
          "id": "KALICONT000005635624",
          "title": "Transports routiers et activités auxiliaires du transport",
          "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
          "slug": "16-transports-routiers-et-activites-auxiliaires-du-transport"
        }
        `
        );
    
        describe("HeuresRechercheEmploi", () => {
          beforeEach(() => {
            render(<HeuresRechercheEmploi icon={""} title={""} displayTitle={""} />);
                fireEvent.click(ui.introduction.startButton.get());
                
    
        fireEvent.click(ui.next.get());
      
    
          });
          
      describe("typeRupture = 1| Démission", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("typeRupture"), {
          target: { value: "1| Démission" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.catégorie professionnelle = 47| Agents de maîtrise et Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "47| Agents de maîtrise et Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.durée du travail = 1| Temps complet", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "1| Temps complet" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour ouvré dans une limite de 40 heures. Pour les salariés de l'arrondissement de Valenciennes, cette limite est portée à 50 heures/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 10/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.durée du travail = 2| Temps partiel", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "2| Temps partiel" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour ouvré proportionnellement au temps de travail contractuel du salarié/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 10/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 16| Employés", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "16| Employés" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.durée du travail = 2| Temps partiel", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "2| Temps partiel" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour ouvré, proportionnellement au temps de travail contractuel du salarié, dans une limite de 40 heures. Pour les salariés de l'arrondissement de Valenciennes, cette limite est portée à 50 heures/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées, sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 16/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.durée du travail = 1| Temps complet", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "1| Temps complet" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour ouvré dans une limite de 40 heures. Pour les salariés de l'arrondissement de Valenciennes, cette limite est portée à 50 heures/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées, sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 16/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
        
      });
    
      describe("typeRupture = 3| Licenciement", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("typeRupture"), {
          target: { value: "3| Licenciement" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.catégorie professionnelle = 47| Agents de maîtrise et Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "47| Agents de maîtrise et Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.durée du travail = 1| Temps complet", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "1| Temps complet" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour ouvré/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 10/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.durée du travail = 2| Temps partiel", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "2| Temps partiel" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour ouvré proportionnellement au temps de travail contractuel du salarié/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Si le contrat est rompu par l'employeur au cours du renouvellement de la période d'essai, le personnel d'encadrement est autorisé à s'absenter pendant le délai de prévenance \(s'il est effectué\), chaque jour ouvré pendant 2 heures, afin de rechercher un nouvel emploi jusqu'au moment où celui-ci aura été trouvé, dans la limite de 40 heures. Les heures d'absence sont fixées d'un commun accord entre les parties ou, à défaut, un jour par l'employeur et le suivant par le salarié./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 10/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 16| Employés", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "16| Employés" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.durée du travail = 1| Temps complet", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "1| Temps complet" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour ouvré dans une limite de 40 heures. Pour les salariés de l'arrondissement de Valenciennes, cette limite est portée à 50 heures/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées, sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 16/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.durée du travail = 2| Temps partiel", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "2| Temps partiel" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour ouvré dans une limite de 40 heures. Pour les salariés de l'arrondissement de Valenciennes, cette limite est portée à 50 heures/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées, sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 16/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
        
      });
    
      describe("typeRupture = 7| Rupture de la période d'essai", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("typeRupture"), {
          target: { value: "7| Rupture de la période d'essai" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.catégorie professionnelle = 47| Agents de maîtrise et Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "47| Agents de maîtrise et Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.durée du travail = 1| Temps complet", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "1| Temps complet" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 3/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.durée du travail = 2| Temps partiel", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "2| Temps partiel" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour proportionnellement au temps de travail contractuel du salarié/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Si le contrat est rompu par l'employeur au cours du renouvellement de la période d'essai, le personnel d'encadrement est autorisé à s'absenter pendant le délai de prévenance \(s'il est effectué\), chaque jour ouvré pendant 2 heures, afin de rechercher un nouvel emploi jusqu'au moment où celui-ci aura été trouvé, dans la limite de 40 heures. Les heures d'absence sont fixées d'un commun accord entre les parties ou, à défaut, un jour par l'employeur et le suivant par le salarié./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 3/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 16| Employés", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "16| Employés" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 16/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
          
        });
      