
        import { DureePreavisDemission } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 1351,
          "shortTitle": "Transports routiers et activités auxiliaires du transport",
          "id": "KALICONT000005635624",
          "title": "Transports routiers et activités auxiliaires du transport",
          "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
          "slug": "16-transports-routiers-et-activites-auxiliaires-du-transport"
        }
        `
        );
    
        describe("DureePreavisDemission", () => {
          beforeEach(() => {
            render(<DureePreavisDemission icon={""} title={""} displayTitle={""} />);
                fireEvent.click(ui.introduction.startButton.get());
                
    
        fireEvent.click(ui.next.get());
      
    
          });
          
      describe("criteria.catégorie professionnelle = 20| Agents d'exploitation, employés administratifs et techniciens", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "20| Agents d'exploitation, employés administratifs et techniciens" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.niveau = 1| I", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "1| I" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 1| Moins de 15 jours", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "1| Moins de 15 jours" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/il n’y a pas de préavis à effectuer/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 2| 15 jours à 1 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "2| 15 jours à 1 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 jour/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 8| Plus de 1 mois à 2 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "8| Plus de 1 mois à 2 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 jours/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 18| Plus de 2 mois à 6 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "18| Plus de 2 mois à 6 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/7 jours/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 36| Plus de 6 mois à 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "36| Plus de 6 mois à 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "43| Plus de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.niveau = 3| II", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "3| II" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 1| Moins de 15 jours", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "1| Moins de 15 jours" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/il n’y a pas de préavis à effectuer/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 2| 15 jours à 1 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "2| 15 jours à 1 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 jour/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 8| Plus de 1 mois à 2 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "8| Plus de 1 mois à 2 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 jours/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 18| Plus de 2 mois à 6 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "18| Plus de 2 mois à 6 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/7 jours/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 36| Plus de 6 mois à 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "36| Plus de 6 mois à 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "43| Plus de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.niveau = 4| III", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "4| III" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 1| Moins de 15 jours", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "1| Moins de 15 jours" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/il n’y a pas de préavis à effectuer/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 2| 15 jours à 1 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "2| 15 jours à 1 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 jour/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 8| Plus de 1 mois à 2 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "8| Plus de 1 mois à 2 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 jours/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 18| Plus de 2 mois à 6 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "18| Plus de 2 mois à 6 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/7 jours/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 36| Plus de 6 mois à 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "36| Plus de 6 mois à 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "43| Plus de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.niveau = 5| IV", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "5| IV" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 2| 15 jours à 1 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "2| 15 jours à 1 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 jour/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 8| Plus de 1 mois à 2 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "8| Plus de 1 mois à 2 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 jours/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 18| Plus de 2 mois à 6 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "18| Plus de 2 mois à 6 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/14 jours/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 36| Plus de 6 mois à 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "36| Plus de 6 mois à 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "43| Plus de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.niveau = 7| V", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "7| V" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 2| 15 jours à 1 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "2| 15 jours à 1 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 jour/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 8| Plus de 1 mois à 2 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "8| Plus de 1 mois à 2 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 jours/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 18| Plus de 2 mois à 6 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "18| Plus de 2 mois à 6 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/14 jours/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 36| Plus de 6 mois à 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "36| Plus de 6 mois à 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "43| Plus de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 23| Agents de maîtrise", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "23| Agents de maîtrise" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.niveau = 1| I", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "1| I" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 7| 15 jours à 2 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "7| 15 jours à 2 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 12| Plus de 2 mois à 3 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "12| Plus de 2 mois à 3 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 20| Plus de 3 mois à 6 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "20| Plus de 3 mois à 6 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 36| Plus de 6 mois à 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "36| Plus de 6 mois à 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "43| Plus de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.niveau = 3| II", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "3| II" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 7| 15 jours à 2 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "7| 15 jours à 2 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 12| Plus de 2 mois à 3 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "12| Plus de 2 mois à 3 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 20| Plus de 3 mois à 6 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "20| Plus de 3 mois à 6 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 36| Plus de 6 mois à 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "36| Plus de 6 mois à 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "43| Plus de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.niveau = 4| III", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "4| III" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 7| 15 jours à 2 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "7| 15 jours à 2 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 12| Plus de 2 mois à 3 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "12| Plus de 2 mois à 3 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 20| Plus de 3 mois à 6 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "20| Plus de 3 mois à 6 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 36| Plus de 6 mois à 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "36| Plus de 6 mois à 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "43| Plus de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.niveau = 5| IV", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "5| IV" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 7| 15 jours à 2 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "7| 15 jours à 2 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 12| Plus de 2 mois à 3 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "12| Plus de 2 mois à 3 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 20| Plus de 3 mois à 6 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "20| Plus de 3 mois à 6 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 36| Plus de 6 mois à 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "36| Plus de 6 mois à 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "43| Plus de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.niveau = 7| V", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "7| V" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 7| 15 jours à 2 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "7| 15 jours à 2 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 12| Plus de 2 mois à 3 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "12| Plus de 2 mois à 3 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 20| Plus de 3 mois à 6 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "20| Plus de 3 mois à 6 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 36| Plus de 6 mois à 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "36| Plus de 6 mois à 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "43| Plus de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe V: Agents de maîtrise, article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 48| Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "48| Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 2| 15 jours à 1 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "2| 15 jours à 1 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/7 jours/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe VI: Cadres, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 11| Plus de 1 mois à 3 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "11| Plus de 1 mois à 3 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/14 jours/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe VI: Cadres, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 20| Plus de 3 mois à 6 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "20| Plus de 3 mois à 6 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe VI: Cadres, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 26| Plus de 6 mois à 1 an", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "26| Plus de 6 mois à 1 an" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe VI: Cadres, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 27| Plus de 1 an", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "27| Plus de 1 an" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe VI: Cadres, article 9/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
          
        });
      