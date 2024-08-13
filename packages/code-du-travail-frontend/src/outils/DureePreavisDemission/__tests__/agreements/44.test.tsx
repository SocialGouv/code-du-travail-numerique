
        import { DureePreavisDemission } from "../../index";
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
    
        describe("DureePreavisDemission", () => {
          beforeEach(() => {
            render(<DureePreavisDemission icon={""} title={""} displayTitle={""} />);
                fireEvent.click(ui.introduction.startButton.get());
                
    
        fireEvent.click(ui.next.get());
      
    
          });
          
      describe("criteria.catégorie professionnelle = 21| Agents de maîtrise et Techniciens", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "21| Agents de maîtrise et Techniciens" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.coefficient = 11| Inférieur à 275", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "11| Inférieur à 275" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.coefficient = 14| Supérieur à 275 (inclus)", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "14| Supérieur à 275 (inclus)" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("3 mois")[0]).toBeInTheDocument();
            
          });
        
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
            
              expect(screen.queryAllByText("3 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.catégorie professionnelle = 14| Ouvriers et collaborateurs", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "14| Ouvriers et collaborateurs" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.coefficient = 1| Inférieur à 160", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "1| Inférieur à 160" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("15 jours")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.coefficient = 2| Entre 160 (inclus) et 175", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "2| Entre 160 (inclus) et 175" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("1 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.coefficient = 8| 190 et plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "8| 190 et plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
          
        });
      