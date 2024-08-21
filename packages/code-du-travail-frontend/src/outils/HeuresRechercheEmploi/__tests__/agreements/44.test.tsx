
        import { HeuresRechercheEmploi } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 44,
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
        
      describe("criteria.catégorie professionnelle = 23| Agents de maîtrise", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "23| Agents de maîtrise" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire du travail dans l'établissement/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu. Les heures non utilisées ne seront pas payées/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salarié peut utiliser les heures après en avoir informé la direction./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 2 du 14 mars 1955,relatif aux agents de maîtrise et techniciens, article 20/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 60| Ingénieurs, Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "60| Ingénieurs, Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire du travail dans l'établissement/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu. Les heures non utilisées ne seront pas payées./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salarié s'absente après accord avec la direction./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 3 du 16 juin 1955 relatif aux ingénieurs et cadres Article 4/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 6| Ouvriers, Employés", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "6| Ouvriers, Employés" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/un nombre d'heures équivalant à la durée hebdomadaire du travail dans l'établissement/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu. Les heures non utilisées ne seront pas payées./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salarié a automatiquement droit à ces heures d'absence. Elles seront fixées un jour par le salarié et un jour par l'employeur. Si l'employeur et le salarié trouvent un accord, ces heures pourront être groupées en partie ou en totalité./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs, Article 27./)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 28| Techniciens", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "28| Techniciens" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.groupe = 3| De I à III", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "3| De I à III" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire du travail dans l'établissement/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu. Les heures non utilisées ne seront pas payées./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salarié a automatiquement droit à ces heures d'absence. Elles seront fixées un jour par le salarié et un jour par l'employeur. Si l'employeur et le salarié trouvent un accord, ces heures pourront être groupées en partie ou en totalité./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs, Article 27./)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.groupe = 6| IV", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "6| IV" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire du travail dans l'établissement/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu. Les heures non utilisées ne seront pas payées./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salarié peut utiliser ces heures après en avoir informé la direction./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 2 du 14 mars 1955,relatif aux agents de maîtrise et techniciens, article 20/)[0]).toBeInTheDocument();
          
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
        
      describe("criteria.catégorie professionnelle = 23| Agents de maîtrise", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "23| Agents de maîtrise" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/30 heures, si le contrat de travail est rompu après la moitié de la période d'essai/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont choisies par le salarié./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 2 du 14 mars 1955,relatif aux agents de maîtrise et techniciens, article 3/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 60| Ingénieurs, Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "60| Ingénieurs, Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 5| 1 mois et demi ou moins", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "5| 1 mois et demi ou moins" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 3 du 16 juin 1955 relatif aux ingénieurs et cadres Article 4/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 6| Plus de 1 mois et demi", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "6| Plus de 1 mois et demi" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/30 heures, si le contrat de travail est rompu après un mois et demi/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont choisies par le salarié./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 3 du 16 juin 1955 relatif aux ingénieurs et cadres Article 4/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 6| Ouvriers, Employés", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "6| Ouvriers, Employés" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.durée du préavis = 5| 15 jours", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
          target: { value: "5| 15 jours" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/30 heures/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont choisies par le salarié./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs, Article 3/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.durée du préavis = 2| 6 jours", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
          target: { value: "2| 6 jours" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/12 heures/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont choisies par le salarié./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs, Article 3/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 28| Techniciens", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "28| Techniciens" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.durée du préavis = 5| 15 jours", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
          target: { value: "5| 15 jours" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.groupe = 3| De I à III", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "3| De I à III" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/30 heures/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont choisies par le salarié./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs, Article 3/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.groupe = 6| IV", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "6| IV" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/30 heures/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont choisies par le salarié./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 2 du 14 mars 1955,relatif aux agents de maîtrise et techniciens, article 3/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.durée du préavis = 2| 6 jours", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
          target: { value: "2| 6 jours" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.groupe = 3| De I à III", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "3| De I à III" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/12 heures/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont choisies par le salarié./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs, Article 3/)[0]).toBeInTheDocument();
          
    });
  
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
        
      describe("criteria.catégorie professionnelle = 23| Agents de maîtrise", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "23| Agents de maîtrise" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire du travail dans l'établissement/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu. Les heures non utilisées ne seront pas payées/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salarié peut utiliser les heures après en avoir informé la direction./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 2 du 14 mars 1955,relatif aux agents de maîtrise et techniciens, article 20/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 60| Ingénieurs, Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "60| Ingénieurs, Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire du travail dans l'établissement/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu. Les heures non utilisées ne seront pas payées./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salarié s'absente après accord avec la direction./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 3 du 16 juin 1955 relatif aux ingénieurs et cadres Article 4/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 6| Ouvriers, Employés", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "6| Ouvriers, Employés" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/un nombre d'heures équivalant à la durée hebdomadaire du travail dans l'établissement/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu. Les heures non utilisées ne seront pas payées./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salarié a automatiquement droit à ces heures d'absence. Elles seront fixées un jour par le salarié et un jour par l'employeur. Si l'employeur et le salarié trouvent un accord, ces heures pourront être groupées en partie ou en totalité./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs, Article 27./)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 28| Techniciens", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "28| Techniciens" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.groupe = 3| De I à III", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "3| De I à III" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire du travail dans l'établissement/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu. Les heures non utilisées ne seront pas payées./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salarié a automatiquement droit à ces heures d'absence. Elles seront fixées un jour par le salarié et un jour par l'employeur. Si l'employeur et le salarié trouvent un accord, ces heures pourront être groupées en partie ou en totalité./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs, Article 27./)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.groupe = 6| IV", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "6| IV" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire du travail dans l'établissement/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu. Les heures non utilisées ne seront pas payées./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salarié peut utiliser ces heures après en avoir informé la direction./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant n° 2 du 14 mars 1955,relatif aux agents de maîtrise et techniciens, article 20/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
        
      });
    
          
        });
      